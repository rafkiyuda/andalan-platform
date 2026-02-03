import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

// ANDALAN Instant - Parse user intent from natural language
export async function parseIntent(userInput: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Analyze this service request and extract structured information:
"${userInput}"

Return a JSON object with:
- service_type: type of service needed (e.g., "plumbing", "electrical", "cleaning", "ac_repair")
- location: location mentioned or "not specified"
- urgency: "low", "medium", or "high"
- description: brief summary of the problem

Example output:
{
  "service_type": "plumbing",
  "location": "Jakarta Selatan",
  "urgency": "high",
  "description": "Pipe leak in bathroom"
}

Only return the JSON, no other text.
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error('Failed to parse intent');
    } catch (error) {
        console.error('Error parsing intent:', error);
        return {
            service_type: 'general',
            location: 'not specified',
            urgency: 'medium',
            description: userInput,
        };
    }
}

// ANDALAN Diagnosis - Analyze problem from image or text
export async function analyzeProblem(input: {
    text?: string;
    imageBase64?: string;
}) {
    // Use gemini-1.5-flash for both text and vision (replaces deprecated gemini-pro-vision)
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
    });

    let prompt = `
PENTING: Anda adalah asisten AI untuk platform ANDALAN yang menganalisis masalah peralatan rumah tangga atau jasa.

${input.text ? `Deskripsi masalah dari user: ${input.text}` : ''}
${input.imageBase64 ? 'Analisis gambar yang diberikan untuk mendeteksi masalah.' : ''}

Tugas Anda:
1. Identifikasi masalah yang terdeteksi dari gambar/teks
2. Tentukan tingkat urgensi (low/medium/high)
3. Rekomendasikan jenis layanan yang dibutuhkan
4. Estimasi biaya perbaikan dalam IDR
5. Berikan penjelasan detail masalahnya

Format output JSON (HANYA JSON, tidak ada teks lain):
{
  "problem": "nama masalah yang jelas dalam Bahasa Indonesia",
  "urgency": "low/medium/high",
  "recommended_service": "jenis_layanan_yang_dibutuhkan",
  "price_estimation": "range harga dalam format 'Rp 100.000 - Rp 500.000'",
  "description": "penjelasan detail masalah dan kemungkinan penyebab dalam Bahasa Indonesia"
}

Contoh untuk AC rusak:
{
  "problem": "AC Tidak Dingin",
  "urgency": "medium",
  "recommended_service": "Teknisi AC",
  "price_estimation": "Rp 150.000 - Rp 500.000",
  "description": "Kemungkinan penyebabnya adalah kebocoran freon, kompresor lemah, atau filter kotor. Perlu dibersihkan dan dicek tekanan freon."
}

Berikan diagnosis yang spesifik dan berguna!
`;

    try {
        let result;
        if (input.imageBase64) {
            // Vision API call with image
            result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: input.imageBase64,
                    },
                },
            ]);
        } else {
            // Text-only call
            result = await model.generateContent(prompt);
        }

        const response = await result.response;
        const text = response.text();

        console.log('Gemini response:', text); // Debug log

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return parsed;
        }

        throw new Error('Failed to parse JSON from AI response');
    } catch (error) {
        console.error('Error analyzing problem:', error);

        // Return more helpful error response
        return {
            problem: 'Gagal Menganalisis',
            urgency: 'medium',
            recommended_service: 'Layanan Umum',
            price_estimation: 'Rp 100.000 - Rp 500.000',
            description: `Maaf, ada kesalahan saat menganalisis. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Silakan coba lagi atau tambahkan deskripsi text yang lebih detail.`,
        };
    }
}

// General AI response generation
export async function generateResponse(prompt: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}
