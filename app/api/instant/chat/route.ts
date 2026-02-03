import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        if (!messages || messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages are required' },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Build conversation history
        const lastUserMessage = messages[messages.length - 1];
        const userQuery = lastUserMessage.content;

        const prompt = `
Anda adalah "Andalan AI", asisten cerdas untuk platform marketplace jasa ANDALAN.

TUGAS ANDA:
1. Pahami masalah atau kebutuhan jasa dari user
2. Berikan saran solusi atau jenis layanan yang dibutuhkan
3. Jika masalah memerlukan foto/gambar untuk diagnosis yang lebih akurat, sarankan user untuk switch ke mode "Foto"
4. Berikan estimasi harga dan tingkat urgensi jika relevan
5. Jawab dengan ramah dalam Bahasa Indonesia

BATASAN:
- Jangan membuat rekomendasi mitra spesifik (hanya jenis layanan)
- Fokus pada memahami masalah dan memberikan saran umum
- Jika user memerlukan pencarian mitra, arahkan ke menu "Cari" atau mode "Foto" untuk diagnosis visual

Pertanyaan user: ${userQuery}

Berikan respons yang helpful, ramah, dan to the point.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            message: text,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Instant chat error:', error);
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}
