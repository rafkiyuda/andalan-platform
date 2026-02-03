'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Star,
    Briefcase,
    Edit,
    LogOut,
    Shield,
} from 'lucide-react';

interface UserProfile {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    userType: string;
    avatar?: string;
    bio?: string;
    location?: string;
    rating?: number;
    totalJobs: number;
    phoneVerified: boolean;
    emailVerified: boolean;
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">
            {/* Header */}
            <div className="bg-gradient-soft border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-3xl font-bold">
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    profile.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            {profile.userType === 'mitra' && (
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full">
                                    <Shield className="h-4 w-4" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">
                                {profile.name}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                                <span className="capitalize px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {profile.userType === 'customer' ? 'Customer' : 'Mitra/Pekerja'}
                                </span>
                                {profile.userType === 'mitra' && profile.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{profile.rating.toFixed(1)}</span>
                                    </div>
                                )}
                                {profile.userType === 'mitra' && (
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{profile.totalJobs} pekerjaan</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="rounded-xl"
                                onClick={() => router.push('/profile/edit')}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Keluar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Contact Info */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold font-heading mb-4">
                                Informasi Kontak
                            </h2>
                            <div className="space-y-4">
                                {profile.phone && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-muted-foreground">No. HP</div>
                                            <div className="font-medium">{profile.phone}</div>
                                        </div>
                                        {profile.phoneVerified && (
                                            <Shield className="h-4 w-4 text-green-600" />
                                        )}
                                    </div>
                                )}

                                {profile.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-muted-foreground">Email</div>
                                            <div className="font-medium">{profile.email}</div>
                                        </div>
                                        {profile.emailVerified && (
                                            <Shield className="h-4 w-4 text-green-600" />
                                        )}
                                    </div>
                                )}

                                {profile.location && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-muted-foreground">Lokasi</div>
                                            <div className="font-medium">{profile.location}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bio */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold font-heading mb-4">Tentang</h2>
                            <p className="text-muted-foreground">
                                {profile.bio || 'Belum ada bio'}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
