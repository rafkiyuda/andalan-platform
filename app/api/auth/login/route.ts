import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { identifier, password } = body; // identifier can be phone or email

        if (!identifier || !password) {
            return NextResponse.json(
                { error: 'Phone/email and password are required' },
                { status: 400 }
            );
        }

        // Find user by phone or email
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { phone: identifier },
                    { email: identifier },
                ],
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.passwordHash);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create session
        const session = await createSession(user.id);

        // Return user data and token
        return NextResponse.json({
            token: session.token,
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                userType: user.userType,
                avatar: user.avatar,
                phoneVerified: user.phoneVerified,
                emailVerified: user.emailVerified,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Failed to login' },
            { status: 500 }
        );
    }
}
