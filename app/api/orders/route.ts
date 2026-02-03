import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/orders - Fetch all orders
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const status = searchParams.get('status');

        const where: any = {};
        if (userId) where.userId = userId;
        if (status) where.status = status;

        const orders = await prisma.order.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

// POST /api/orders - Create new order
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            userId,
            serviceType,
            serviceName,
            description,
            price,
            location,
            scheduledAt,
        } = body;

        // Validate required fields
        if (!userId || !serviceType || !serviceName || !description || !price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create or get user
        let user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            // Create a default user if not exists
            user = await prisma.user.create({
                data: {
                    id: userId,
                    name: 'Guest User',
                    email: `${userId}@guest.andalan.com`,
                    passwordHash: 'guest-temp-hash',
                    userType: 'customer',
                },
            });
        }

        // Create order
        const order = await prisma.order.create({
            data: {
                userId,
                serviceType,
                serviceName,
                description,
                price: parseFloat(price),
                location,
                scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
                status: 'pending',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
