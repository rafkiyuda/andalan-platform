'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SplashPage() {
    const router = useRouter();

    useEffect(() => {
        // Check for auth token
        const token = localStorage.getItem('auth_token');

        setTimeout(() => {
            if (token) {
                // Validate token and redirect to home
                router.push('/');
            } else {
                router.push('/login');
            }
        }, 2000);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
            <div className="text-center animate-fade-in">
                <div className="mb-8">
                    <div className="text-6xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent">
                        ANDALAN
                    </div>
                    <p className="text-muted-foreground mt-2">
                        Platform Jasa Terpercaya Berbasis AI
                    </p>
                </div>
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            </div>
        </div>
    );
}
