import { NextResponse } from 'next/server';
import { parseIntent } from '@/lib/gemini';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { query, location } = body;

        if (!query) {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            );
        }

        // Parse intent using Gemini AI
        const intent = await parseIntent(query);

        // Find matching providers (mitra)
        const providers = await prisma.user.findMany({
            where: {
                userType: 'mitra',
                isOnline: true,
                services: {
                    has: intent.service_type,
                },
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                rating: true,
                totalJobs: true,
                location: true,
                services: true,
            },
            take: 10,
        });

        return NextResponse.json({
            intent,
            providers,
            query,
        });
    } catch (error) {
        console.error('Instant search error:', error);
        return NextResponse.json(
            { error: 'Failed to process search' },
            { status: 500 }
        );
    }
}
