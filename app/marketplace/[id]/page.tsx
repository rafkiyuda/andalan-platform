'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    Users,
    AlertCircle,
    Send,
} from 'lucide-react';
import { getJobPostById } from '@/lib/mock-jobs';
import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { useState } from 'react';

const urgencyColors = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const categoryColors = {
    tukang: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    it: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    rumah_tangga: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    otomotif: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    kecantikan: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = params.id as string;
    const job = getJobPostById(jobId);

    const [proposedPrice, setProposedPrice] = useState('');
    const [estimatedDays, setEstimatedDays] = useState('');
    const [message, setMessage] = useState('');
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);

    if (!job) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="p-8 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold">Pekerjaan Tidak Ditemukan</h2>
                        <p className="text-muted-foreground">
                            Pekerjaan yang Anda cari tidak tersedia atau sudah ditutup.
                        </p>
                        <Button onClick={() => router.push('/marketplace')} className="rounded-xl">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali ke Marketplace
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const timeAgo = formatDistanceToNow(new Date(job.createdAt), {
        addSuffix: true,
        locale: localeId,
    });

    const handleSubmitApplication = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/marketplace/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobPostId: jobId,
                    proposedPrice,
                    estimatedDays,
                    message,
                    providerId: 'demo_provider_123',
                    providerName: 'Demo Provider',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success!
                setApplicationSubmitted(true);
                setShowApplicationForm(false);
                setProposedPrice('');
                setEstimatedDays('');
                setMessage('');

                // Show success message
                setTimeout(() => {
                    alert('✅ Penawaran berhasil dikirim!\n\nPemberi kerja akan meninjau aplikasi Anda segera.');
                }, 100);
            } else {
                throw new Error(data.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('❌ Gagal mengirim penawaran. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-8">
            {/* Header */}
            <div className="bg-gradient-soft border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 py-6">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="rounded-xl mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali
                    </Button>
                    <h1 className="text-2xl md:text-3xl font-bold font-heading">
                        {job.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">Posted {timeAgo}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Info Card */}
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                {/* Badges */}
                                <div className="flex flex-wrap gap-2">
                                    <Badge className={categoryColors[job.category as keyof typeof categoryColors]}>
                                        {job.subcategory || job.category}
                                    </Badge>
                                    <Badge className={urgencyColors[job.urgency]}>
                                        {job.urgency === 'high' && 'Urgent'}
                                        {job.urgency === 'medium' && 'Normal'}
                                        {job.urgency === 'low' && 'Flexible'}
                                    </Badge>
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        {job.applicationCount} Lamar
                                    </Badge>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-3">Deskripsi Pekerjaan</h3>
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {job.description}
                                    </p>
                                </div>

                                {/* Budget */}
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <div className="text-sm text-muted-foreground mb-1">Budget</div>
                                    <div className="text-2xl font-bold text-primary">
                                        Rp {job.budgetMin.toLocaleString('id-ID')} - Rp {job.budgetMax.toLocaleString('id-ID')}
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Lokasi</div>
                                            <div className="font-medium">{job.location}</div>
                                        </div>
                                    </div>
                                    {job.deadline && (
                                        <div className="flex items-start gap-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <div className="text-sm text-muted-foreground">Deadline</div>
                                                <div className="font-medium">
                                                    {new Date(job.deadline).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Diposting</div>
                                            <div className="font-medium">{timeAgo}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Form */}
                        {applicationSubmitted ? (
                            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                                <CardContent className="p-6 text-center space-y-3">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="font-bold text-lg text-green-900 dark:text-green-300">
                                        Penawaran Terkirim!
                                    </h3>
                                    <p className="text-sm text-green-800 dark:text-green-200">
                                        Pemberi kerja akan meninjau penawaran Anda dan menghubungi jika tertarik.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/marketplace')}
                                        className="rounded-xl mt-4"
                                    >
                                        Lihat Pekerjaan Lainnya
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : !showApplicationForm ? (
                            <Button
                                onClick={() => setShowApplicationForm(true)}
                                className="w-full rounded-xl bg-gradient-primary text-white h-12"
                                size="lg"
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Ajukan Penawaran
                            </Button>
                        ) : (
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Ajukan Penawaran Anda</h3>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Harga yang Ditawarkan
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="Contoh: 500000"
                                            value={proposedPrice}
                                            onChange={(e) => setProposedPrice(e.target.value)}
                                            className="rounded-xl"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Estimasi Waktu Pengerjaan (hari)
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="Contoh: 3"
                                            value={estimatedDays}
                                            onChange={(e) => setEstimatedDays(e.target.value)}
                                            className="rounded-xl"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Pesan untuk Pemberi Kerja
                                        </label>
                                        <Textarea
                                            placeholder="Ceritakan keahlian dan pengalaman Anda yang relevan..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={5}
                                            className="rounded-xl"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowApplicationForm(false)}
                                            className="flex-1 rounded-xl"
                                            disabled={isSubmitting}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            onClick={handleSubmitApplication}
                                            disabled={!proposedPrice || !estimatedDays || !message || isSubmitting}
                                            className="flex-1 rounded-xl bg-gradient-primary text-white"
                                        >
                                            {isSubmitting ? 'Mengirim...' : 'Kirim Penawaran'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-semibold text-lg">Pemberi Kerja</h3>
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-lg">
                                        {job.userName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium">{job.userName}</div>
                                        <div className="text-sm text-muted-foreground">Member sejak 2023</div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="text-sm text-muted-foreground mb-2">Lokasi</div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{job.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips Card */}
                        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                            <CardContent className="p-6 space-y-3">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-300">💡 Tips Melamar</h3>
                                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                                    <li>• Tawarkan harga yang kompetitif dan realistis</li>
                                    <li>• Jelaskan pengalaman relevan Anda</li>
                                    <li>• Berikan estimasi waktu yang jujur</li>
                                    <li>• Tunjukkan portfolio jika ada</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
