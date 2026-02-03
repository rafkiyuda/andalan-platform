import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyOTP } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { identifier, otp } = body; // identifier is phone or email

        if (!identifier || !otp) {
            return NextResponse.json(
                { error: 'Identifier and OTP are required' },
                { status: 400 }
            );
        }

        // Verify OTP
        const isValid = verifyOTP(identifier, otp);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 401 }
            );
        }

        // Update user verification status
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
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Update verification status
        await prisma.user.update({
            where: { id: user.id },
            data: {
                phoneVerified: user.phone === identifier ? true : user.phoneVerified,
                emailVerified: user.email === identifier ? true : user.emailVerified,
            },
        });

        return NextResponse.json({
            message: 'OTP verified successfully',
            verified: true,
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}
