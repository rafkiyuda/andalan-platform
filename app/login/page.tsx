'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Save token
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to home
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
            <Card className="w-full max-w-md glass">
                <CardHeader className="text-center">
                    <div className="text-4xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent mb-2">
                        ANDALAN
                    </div>
                    <CardTitle>Masuk ke Akun Anda</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                No. HP atau Email
                            </label>
                            <Input
                                type="text"
                                placeholder="08123456789 atau email@example.com"
                                value={formData.identifier}
                                onChange={(e) =>
                                    setFormData({ ...formData, identifier: e.target.value })
                                }
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="Masukkan password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-gradient-primary text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <LogIn className="h-4 w-4 mr-2" />
                                    Masuk
                                </>
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Belum punya akun? </span>
                            <Link
                                href="/register"
                                className="text-primary font-medium hover:underline"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
