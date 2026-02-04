import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const worker = await prisma.worker.findUnique({
            where: { id }
        });

        if (!worker) {
            return NextResponse.json(
                { error: 'Worker not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(worker);
    } catch (error) {
        console.error('Error fetching worker:', error);
        return NextResponse.json(
            { error: 'Failed to fetch worker data' },
            { status: 500 }
        );
    }
}
