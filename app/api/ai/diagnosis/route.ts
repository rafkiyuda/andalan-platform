import { NextResponse } from 'next/server';
import { analyzeProblem } from '@/lib/gemini';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text, imageBase64 } = body;

        if (!text && !imageBase64) {
            return NextResponse.json(
                { error: 'Text or image is required' },
                { status: 400 }
            );
        }

        // Analyze problem using Gemini AI
        const diagnosis = await analyzeProblem({
            text,
            imageBase64,
        });

        return NextResponse.json({
            diagnosis,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Diagnosis error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze problem' },
            { status: 500 }
        );
    }
}
