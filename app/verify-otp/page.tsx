'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OTPInput } from '@/components/otp-input';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function VerifyOTPPage() {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [identifier, setIdentifier] = useState('');

    useEffect(() => {
        const storedIdentifier = localStorage.getItem('otp_identifier');
        if (!storedIdentifier) {
            router.push('/register');
            return;
        }
        setIdentifier(storedIdentifier);
    }, [router]);

    const handleVerify = async (otpValue: string) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier,
                    otp: otpValue,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Verification failed');
            }

            // Clear temp data
            localStorage.removeItem('pending_user');
            localStorage.removeItem('otp_identifier');

            // Redirect to login
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
            <Card className="w-full max-w-md glass">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Verifikasi OTP</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                        Masukkan kode OTP yang dikirim ke {identifier}
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        onComplete={handleVerify}
                    />

                    {loading && (
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Memverifikasi...</span>
                        </div>
                    )}

                    <div className="text-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary"
                            onClick={() => {
                                // TODO: Implement resend OTP
                                alert('Fitur kirim ulang OTP akan segera hadir');
                            }}
                        >
                            Kirim Ulang OTP
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
