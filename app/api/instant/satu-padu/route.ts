import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { prisma } from '@/lib/prisma';

export const maxDuration = 30;

interface WorkerBreakdown {
    specialization: string;
    quantity: number;
    description: string;
    skills_needed: string[];
}

interface SatuPaduAnalysis {
    job_title: string;
    job_description: string;
    worker_breakdown: WorkerBreakdown[];
    estimated_duration: string;
    total_cost_range: string;
    urgency: string;
}

export async function POST(req: Request) {
    try {
        const { description, imageBase64 } = await req.json();

        if (!description && !imageBase64) {
            return Response.json(
                { error: 'Description or image is required' },
                { status: 400 }
            );
        }

        // Step 1: AI Analysis - Breakdown pekerjaan besar menjadi multiple worker needs
        const analysisPrompt = `Analisis pekerjaan berikut dan breakdown menjadi kebutuhan pekerja yang spesifik.

Deskripsi Pekerjaan: ${description}

Tugas Anda:
1. Identifikasi jenis-jenis pekerjaan yang dibutuhkan
2. Tentukan spesialisasi pekerja untuk setiap jenis pekerjaan
3. Tentukan jumlah pekerja yang dibutuhkan per spesialisasi
4. Estimasi durasi dan biaya total

PENTING: Gunakan spesialisasi yang umum seperti:
- Tukang Bangunan
- Tukang Cat
- Tukang Listrik
- Teknisi AC
- Tukang Ledeng
- Cleaning Service
- Tukang Kebun
- Teknisi Elektronik
- Mekanik Motor
- Mekanik Mobil
- Guru Les

Berikan response dalam format JSON berikut:
{
  "job_title": "Judul pekerjaan singkat",
  "job_description": "Deskripsi lengkap pekerjaan",
  "worker_breakdown": [
    {
      "specialization": "Nama spesialisasi",
      "quantity": jumlah_pekerja_dibutuhkan,
      "description": "Detail pekerjaan untuk spesialisasi ini",
      "skills_needed": ["skill1", "skill2"]
    }
  ],
  "estimated_duration": "Estimasi waktu pengerjaan (contoh: 3-5 hari)",
  "total_cost_range": "Rp 2.000.000 - Rp 5.000.000",
  "urgency": "low/medium/high"
}`;

        const parts: any[] = [{ type: 'text', text: analysisPrompt }];

        if (imageBase64) {
            parts.push({
                type: 'image',
                image: imageBase64,
                mimeType: 'image/jpeg',
            });
        }

        const analysisResult = await generateText({
            model: google('gemini-2.5-flash'),
            messages: [
                {
                    role: 'user',
                    content: parts,
                },
            ],
        });

        // Parse AI response
        let analysis: SatuPaduAnalysis;
        try {
            const jsonMatch = analysisResult.text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('No JSON found in response');
            analysis = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            console.error('Failed to parse AI response:', analysisResult.text);
            return Response.json(
                { error: 'Failed to analyze job requirements' },
                { status: 500 }
            );
        }

        // Step 2: Match workers for each specialization
        const workerMatches: Record<string, any[]> = {};

        for (const breakdown of analysis.worker_breakdown) {
            try {
                // Search workers by specialization
                const workers = await prisma.worker.findMany({
                    where: {
                        AND: [
                            { isAvailable: true },
                            {
                                OR: [
                                    {
                                        specialization: {
                                            contains: breakdown.specialization,
                                            mode: 'insensitive',
                                        },
                                    },
                                    {
                                        skills: {
                                            hasSome: breakdown.skills_needed,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    orderBy: [
                        { rating: 'desc' },
                        { totalJobs: 'desc' },
                    ],
                    take: breakdown.quantity + 2, // Get a few extra for options
                });

                workerMatches[breakdown.specialization] = workers.map(w => ({
                    id: w.id,
                    name: w.name,
                    specialization: w.specialization,
                    rating: w.rating,
                    totalJobs: w.totalJobs,
                    location: w.location,
                    skills: w.skills,
                    pricePerHour: w.pricePerHour,
                    priceRange: w.priceRange,
                    avatar: w.avatar,
                    isVerified: w.isVerified,
                    certifications: w.certifications,
                }));
            } catch (error) {
                console.error(`Error finding workers for ${breakdown.specialization}:`, error);
                workerMatches[breakdown.specialization] = [];
            }
        }

        return Response.json({
            success: true,
            analysis,
            worker_matches: workerMatches,
        });
    } catch (error) {
        console.error('Satu Padu API error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
