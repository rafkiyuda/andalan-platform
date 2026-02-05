'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { WorkerGroupCard } from '@/components/worker-group-card';
import {
    Loader2,
    CheckCircle2,
    Edit,
    Users,
    Clock,
    DollarSign,
    AlertCircle,
    Camera,
    ImagePlus,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkerBreakdown {
    specialization: string;
    quantity: number;
    description: string;
    skills_needed: string[];
}

interface SatuPaduAnalysis {
    job_title: string;
    job_description: string;
    worker_breakdown: WorkerBreakdown[];
    estimated_duration: string;
    total_cost_range: string;
    urgency: string;
}

interface Worker {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    totalJobs: number;
    location: string;
    skills: string[];
    pricePerHour?: number;
    priceRange?: string;
    avatar?: string;
    isVerified: boolean;
    certifications: string[];
}

export function SatuPaduMode() {
    const [step, setStep] = useState<'input' | 'analysis' | 'workers'>('input');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<SatuPaduAnalysis | null>(null);
    const [workerMatches, setWorkerMatches] = useState<Record<string, Worker[]>>({});
    const [selectedWorkers, setSelectedWorkers] = useState<Record<string, string[]>>({});
    const [editMode, setEditMode] = useState(false);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!description.trim() && !image) return;

        setLoading(true);
        try {
            const imageBase64 = image?.split(',')[1];

            const response = await fetch('/api/instant/satu-padu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description,
                    imageBase64,
                }),
            });

            if (!response.ok) throw new Error('Failed to analyze');

            const data = await response.json();
            setAnalysis(data.analysis);
            setWorkerMatches(data.worker_matches);

            // Initialize selected workers (auto-select top workers)
            const initialSelection: Record<string, string[]> = {};
            Object.entries(data.worker_matches).forEach(([spec, workers]: [string, any]) => {
                const breakdown = data.analysis.worker_breakdown.find(
                    (b: WorkerBreakdown) => b.specialization === spec
                );
                if (breakdown && workers.length > 0) {
                    initialSelection[spec] = workers
                        .slice(0, breakdown.quantity)
                        .map((w: Worker) => w.id);
                }
            });
            setSelectedWorkers(initialSelection);

            setStep('analysis');
        } catch (error) {
            console.error('Analysis error:', error);
            alert('Gagal menganalisis pekerjaan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToWorkers = () => {
        setStep('workers');
    };

    const handleWorkerSelection = (specialization: string, workerId: string, selected: boolean) => {
        setSelectedWorkers(prev => {
            const current = prev[specialization] || [];
            if (selected) {
                return { ...prev, [specialization]: [...current, workerId] };
            } else {
                return { ...prev, [specialization]: current.filter(id => id !== workerId) };
            }
        });
    };

    const handleCreateOrder = () => {
        // TODO: Implement order creation
        const totalWorkers = Object.values(selectedWorkers).flat().length;
        alert(`Fitur order untuk ${totalWorkers} pekerja akan segera tersedia!`);
    };

    return (
        <div className="space-y-6">
            {/* Step 1: Input */}
            {step === 'input' && (
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold font-heading">
                                    Satu Padu - Multi Worker Matching
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Untuk pekerjaan besar yang butuh banyak pekerja
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Image Upload */}
                            {image ? (
                                <div className="relative inline-block">
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="rounded-lg max-h-48 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="border-2 border-dashed rounded-xl p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                        <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <p className="text-xs font-medium">Ambil Foto</p>
                                    </label>
                                    <label className="border-2 border-dashed rounded-xl p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                        <ImagePlus className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <p className="text-xs font-medium">Upload Foto</p>
                                    </label>
                                </div>
                            )}

                            {/* Description Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Deskripsikan Pekerjaan Besar Anda
                                </label>
                                <Textarea
                                    placeholder="Contoh: Renovasi rumah - butuh cat ulang seluruh rumah, perbaiki atap bocor, ganti instalasi listrik, dan benerin pipa yang rusak"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={5}
                                    className="rounded-xl"
                                />
                                <p className="text-xs text-muted-foreground">
                                    💡 Jelaskan semua pekerjaan yang dibutuhkan secara detail
                                </p>
                            </div>

                            <Button
                                onClick={handleAnalyze}
                                disabled={(!description.trim() && !image) || loading}
                                className="w-full rounded-xl bg-gradient-primary text-white"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Menganalisis...
                                    </>
                                ) : (
                                    <>
                                        <Users className="h-5 w-5 mr-2" />
                                        Analisis & Cari Pekerja
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 2: Analysis Result */}
            {step === 'analysis' && analysis && (
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold font-heading">
                                            Hasil Analisis Pekerjaan
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            AI telah menganalisis kebutuhan Anda
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Job Title */}
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Judul Pekerjaan
                                    </label>
                                    <p className="text-lg font-bold mt-1">{analysis.job_title}</p>
                                </div>

                                {/* Job Description */}
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Deskripsi
                                    </label>
                                    <p className="mt-1">{analysis.job_description}</p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <div className="p-3 rounded-xl bg-muted/50 border">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Users className="h-4 w-4 text-primary" />
                                            <span className="text-xs text-muted-foreground">Total Pekerja</span>
                                        </div>
                                        <p className="text-xl font-bold">
                                            {analysis.worker_breakdown.reduce((sum, b) => sum + b.quantity, 0)}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-muted/50 border">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="h-4 w-4 text-primary" />
                                            <span className="text-xs text-muted-foreground">Durasi</span>
                                        </div>
                                        <p className="text-sm font-bold">{analysis.estimated_duration}</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-muted/50 border col-span-2 md:col-span-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <DollarSign className="h-4 w-4 text-primary" />
                                            <span className="text-xs text-muted-foreground">Est. Biaya</span>
                                        </div>
                                        <p className="text-sm font-bold">{analysis.total_cost_range}</p>
                                    </div>
                                </div>

                                {/* Worker Breakdown */}
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        Kebutuhan Pekerja
                                    </label>
                                    <div className="space-y-2">
                                        {analysis.worker_breakdown.map((breakdown, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 rounded-xl bg-primary/5 border border-primary/20"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="font-bold">{breakdown.specialization}</p>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {breakdown.quantity} orang
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {breakdown.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {breakdown.skills_needed.map((skill, i) => (
                                                                <Badge key={i} variant="outline" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep('input')}
                                        className="flex-1 rounded-xl"
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        onClick={handleProceedToWorkers}
                                        className="flex-1 rounded-xl bg-gradient-primary text-white"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Lihat Pekerja Tersedia
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Step 3: Worker Matches */}
            {step === 'workers' && analysis && (
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold font-heading mb-2">
                                Pekerja yang Tersedia
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Pilih pekerja untuk setiap spesialisasi (sudah dipilih otomatis yang terbaik)
                            </p>

                            <div className="space-y-4">
                                {analysis.worker_breakdown.map((breakdown) => {
                                    const workers = workerMatches[breakdown.specialization] || [];
                                    const selected = selectedWorkers[breakdown.specialization] || [];

                                    return (
                                        <WorkerGroupCard
                                            key={breakdown.specialization}
                                            breakdown={breakdown}
                                            workers={workers}
                                            selectedWorkerIds={selected}
                                            onWorkerToggle={(workerId: string, isSelected: boolean) =>
                                                handleWorkerSelection(breakdown.specialization, workerId, isSelected)
                                            }
                                        />
                                    );
                                })}
                            </div>

                            {/* Summary & Action */}
                            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium">Total Pekerja Dipilih:</span>
                                    <span className="text-2xl font-bold text-primary">
                                        {Object.values(selectedWorkers).flat().length}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep('analysis')}
                                        className="flex-1 rounded-xl"
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        onClick={handleCreateOrder}
                                        disabled={Object.values(selectedWorkers).flat().length === 0}
                                        className="flex-1 rounded-xl bg-gradient-primary text-white"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Buat Pesanan
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
