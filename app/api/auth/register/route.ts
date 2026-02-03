import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateOTP, storeOTP } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, password, userType } = body;

        // Validate required fields
        if (!name || (!phone && !email) || !password || !userType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate userType
        if (userType !== 'customer' && userType !== 'mitra') {
            return NextResponse.json(
                { error: 'Invalid user type. Must be "customer" or "mitra"' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    phone ? { phone } : {},
                    email ? { email } : {},
                ].filter(obj => Object.keys(obj).length > 0),
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists with this phone or email' },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Generate and store OTP
        const otp = generateOTP();
        const identifier = phone || email || '';
        storeOTP(identifier, otp);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                phone,
                email,
                passwordHash,
                userType,
                phoneVerified: false,
                emailVerified: false,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                userType: true,
                phoneVerified: true,
                emailVerified: true,
            },
        });

        // In production, send OTP via SMS/email
        console.log(`OTP for ${identifier}: ${otp}`);

        return NextResponse.json({
            user,
            otp: process.env.NODE_ENV === 'development' ? otp : undefined, // Only in dev
            message: 'User registered successfully. Please verify OTP.',
        }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Failed to register user' },
            { status: 500 }
        );
    }
}
