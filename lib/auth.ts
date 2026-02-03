import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const TOKEN_EXPIRY = '7d'; // 7 days

export interface TokenPayload {
    userId: string;
    userType: string;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// Token generation and verification
export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        return null;
    }
}

// Session management
export async function createSession(userId: string) {
    const token = generateToken({ userId, userType: 'customer' });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const session = await prisma.session.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    });

    return session;
}

export async function validateSession(token: string) {
    const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
        return null;
    }

    return session;
}

export async function deleteSession(token: string) {
    await prisma.session.delete({
        where: { token },
    });
}

// OTP generation
export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP temporarily (in production, use Redis or similar)
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export function storeOTP(identifier: string, code: string) {
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore.set(identifier, { code, expiresAt });
}

export function verifyOTP(identifier: string, code: string): boolean {
    const stored = otpStore.get(identifier);
    if (!stored) return false;

    if (stored.expiresAt < Date.now()) {
        otpStore.delete(identifier);
        return false;
    }

    if (stored.code === code) {
        otpStore.delete(identifier);
        return true;
    }

    return false;
}

// Get user from token
export async function getUserFromToken(token: string) {
    const session = await validateSession(token);
    return session?.user || null;
}
