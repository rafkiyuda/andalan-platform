import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { prisma } from '@/lib/prisma';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Extract the latest user query
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content || "";

    // RAG: Search workers/mitra from database based on query
    const lowerQuery = query.toLowerCase();
    let searchContext = "";
    let workers: any[] = []; // Declare workers array here

    if (lowerQuery.length > 2) {
        try {
            // Search workers based on skills, specialization, or description
            workers = await prisma.worker.findMany({
                where: {
                    AND: [
                        { isAvailable: true },
                        {
                            OR: [
                                {
                                    skills: {
                                        hasSome: lowerQuery.split(' ')
                                    }
                                },
                                {
                                    specialization: {
                                        contains: lowerQuery,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    description: {
                                        contains: lowerQuery,
                                        mode: 'insensitive'
                                    }
                                }
                            ]
                        }
                    ]
                },
                orderBy: [
                    { rating: 'desc' },
                    { totalJobs: 'desc' }
                ],
                take: 5 // Top 5 matches
            });

            // More flexible keyword matching
            const keywords = [
                'ac', 'kulkas', 'mesin cuci', 'elektronik',
                'pipa', 'kran', 'toilet', 'ledeng', 'plumbing',
                'atap', 'tembok', 'cat', 'bangunan', 'renovasi',
                'bersih', 'cleaning', 'cuci', 'sofa', 'karpet',
                'motor', 'mobil', 'ganti oli', 'service',
                'komputer', 'laptop', 'it', 'software', 'jaringan',
                'les', 'guru', 'belajar', 'matematika', 'fisika', 'kimia', 'inggris', 'english',
                'taman', 'rumput', 'pohon'
            ];

            // Extended search if no results
            if (workers.length === 0) {
                const matchedKeywords = keywords.filter(kw => lowerQuery.includes(kw));

                if (matchedKeywords.length > 0) {
                    const extendedWorkers = await prisma.worker.findMany({
                        where: {
                            AND: [
                                { isAvailable: true },
                                {
                                    OR: matchedKeywords.map(keyword => ({
                                        OR: [
                                            {
                                                skills: {
                                                    hasSome: [keyword]
                                                }
                                            },
                                            {
                                                specialization: {
                                                    contains: keyword,
                                                    mode: 'insensitive'
                                                }
                                            },
                                            {
                                                description: {
                                                    contains: keyword,
                                                    mode: 'insensitive'
                                                }
                                            }
                                        ]
                                    }))
                                }
                            ]
                        },
                        orderBy: [
                            { rating: 'desc' },
                            { totalJobs: 'desc' }
                        ],
                        take: 5
                    });

                    workers.push(...extendedWorkers);
                }
            }

            if (workers.length > 0) {
                const results = workers.map(w =>
                    `- **${w.name}** (${w.specialization})
  Rating: ⭐ ${w.rating}/5.0 (${w.totalJobs} jobs completed)
  Keahlian: ${w.skills.join(', ')}
  Lokasi: ${w.location}
  ${w.priceRange ? `Harga: Rp ${w.priceRange}` : w.pricePerHour ? `Harga: Rp ${w.pricePerHour.toLocaleString('id-ID')}/jam` : ''}
  ${w.description || ''}
  Status: ${w.isAvailable ? '✅ Tersedia' : '❌ Tidak Tersedia'}
  ${w.certifications.length > 0 ? `Sertifikasi: ${w.certifications.join(', ')}` : ''}`
                ).join('\n\n');

                searchContext = `\n\n===== DATA MITRA DARI DATABASE =====\n${results}\n\n`;
            } else {
                searchContext = "\n\n===== TIDAK ADA MITRA YANG COCOK =====\nSaat ini belum ada mitra tersedia yang sesuai dengan kebutuhan Anda. Silakan coba kata kunci lain atau hubungi customer service.\n\n";
            }
        } catch (error) {
            console.error('Database search error:', error);
            searchContext = "\n\nTerjadi kesalahan saat mencari mitra. Silakan coba lagi.\n";
        }
    }

    // Prepare worker IDs for frontend card rendering
    const workerIds = workers.map(w => w.id);

    const result = streamText({
        model: google('gemini-2.5-flash'),
        messages,
        system: `Anda adalah "Andalan AI", asisten cerdas untuk platform marketplace jasa Andalan.

TUGAS UTAMA:
1. Memahami masalah/kebutuhan user dari pesan mereka
2. Mencocokkan dengan mitra (tukang/profesional) yang ADA DI DATABASE
3. Merekomendasikan mitra terbaik berdasarkan data REAL dari database
4. Berikan informasi lengkap: nama, rating, harga, lokasi

ATURAN PENTING:
- HANYA rekomendasikan mitra yang ADA di "DATA MITRA DARI DATABASE" di bawah
- JANGAN membuat rekomendasi fiktif atau mitra yang tidak ada di database
- Jika tidak ada mitra yang cocok, sampaikan dengan jujur dan sarankan mencari dengan kata kunci lain
- Urutkan rekomendasi berdasarkan rating dan jumlah pekerjaan
- Jelaskan mengapa mitra tersebut cocok untuk masalah user
- Jangan cantumkan nomor telepon dalam rekomendasi

FORMAT RESPONS:
1. Pahami masalah user dengan singkat
2. List mitra yang cocok dengan format:
   - **Nama** (Spesialisasi)
   - Rating & pengalaman
   - Keahlian utama
   - Harga
   - Lokasi
   - Alasan singkat kenapa cocok
3. Berikan saran tambahan jika perlu

TONE: Profesional, membantu, ramah, dan jelas. Gunakan Bahasa Indonesia.
PENTING: Card profil mitra akan ditampilkan otomatis di bawah pesan, jadi fokus pada penjelasan.

${searchContext}`,
    });

    // Append worker data as JSON at the end
    const response = result.toTextStreamResponse();

    // Add worker metadata to response headers
    response.headers.set('X-Workers', JSON.stringify(workerIds));

    return response;
}
