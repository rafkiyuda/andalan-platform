import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

// GET - Fetch user profile
export async function GET(request: Request) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await getUserFromToken(token);

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            userType: user.userType,
            avatar: user.avatar,
            bio: user.bio,
            location: user.location,
            rating: user.rating,
            totalJobs: user.totalJobs,
            isOnline: user.isOnline,
            services: user.services,
            phoneVerified: user.phoneVerified,
            emailVerified: user.emailVerified,
        });
    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

// PATCH - Update user profile
export async function PATCH(request: Request) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await getUserFromToken(token);

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, bio, location, avatar, isOnline, services } = body;

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                ...(name && { name }),
                ...(bio !== undefined && { bio }),
                ...(location && { location }),
                ...(avatar && { avatar }),
                ...(isOnline !== undefined && { isOnline }),
                ...(services && { services }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                userType: true,
                avatar: true,
                bio: true,
                location: true,
                rating: true,
                totalJobs: true,
                isOnline: true,
                services: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
