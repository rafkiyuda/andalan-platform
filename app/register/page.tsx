'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserTypeSelector } from '@/components/user-type-selector';
import { UserPlus, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        userType: 'customer' as 'customer' | 'mitra',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Store user data and redirect to OTP verification
            localStorage.setItem('pending_user', JSON.stringify(data.user));
            localStorage.setItem('otp_identifier', formData.phone || formData.email);

            // Show OTP in dev mode
            if (data.otp) {
                alert(`OTP Anda: ${data.otp}`);
            }

            router.push('/verify-otp');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl glass">
                <CardHeader className="text-center">
                    <div className="text-4xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent mb-2">
                        ANDALAN
                    </div>
                    <CardTitle>Daftar Akun Baru</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* User Type Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Daftar Sebagai</label>
                            <UserTypeSelector
                                value={formData.userType}
                                onChange={(type) => setFormData({ ...formData, userType: type })}
                            />
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nama Lengkap</label>
                            <Input
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                                className="rounded-xl"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">No. HP</label>
                            <Input
                                type="tel"
                                placeholder="08123456789"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                required
                                className="rounded-xl"
                            />
                        </div>

                        {/* Email (optional) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Email <span className="text-muted-foreground">(Opsional)</span>
                            </label>
                            <Input
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="rounded-xl"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="Minimal 6 karakter"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                                minLength={6}
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
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Daftar
                                </>
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Sudah punya akun? </span>
                            <Link
                                href="/login"
                                className="text-primary font-medium hover:underline"
                            >
                                Masuk
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
