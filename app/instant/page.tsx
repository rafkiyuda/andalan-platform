'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProviderCard } from '@/components/provider-card';
import { CameraCapture } from '@/components/camera-capture';
import { InstantChatMode } from '@/components/instant-chat-mode';
import {
    Camera,
    Upload,
    Loader2,
    CheckCircle2,
    Edit,
    Search,
    AlertCircle,
    Image as ImageIcon,
    MessageSquare,
    Zap,
} from 'lucide-react';

interface DiagnosisResult {
    problem: string;
    urgency: string;
    recommended_service: string;
    price_estimation: string;
    description: string;
}

interface Provider {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
    totalJobs: number;
    location?: string;
    services: string[];
}

export default function InstantPage() {
    const router = useRouter();
    const [mode, setMode] = useState<'chat' | 'foto'>('foto');
    const [step, setStep] = useState<'upload' | 'camera' | 'diagnosis' | 'providers'>('upload');
    const [image, setImage] = useState<string | null>(null);
    const [textInput, setTextInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [providers, setProviders] = useState<Provider[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraCapture = (imageData: string) => {
        setImage(imageData);
        setStep('upload');
    };

    const handleAnalyze = async () => {
        if (!image && !textInput) return;

        setLoading(true);
        try {
            // Get base64 image without data URL prefix
            const imageBase64 = image?.split(',')[1];

            const response = await fetch('/api/ai/diagnosis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: textInput,
                    imageBase64,
                }),
            });

            const data = await response.json();
            setDiagnosis(data.diagnosis);
            setStep('diagnosis');
        } catch (error) {
            console.error('Diagnosis error:', error);
            alert('Gagal menganalisis masalah. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        if (!diagnosis) return;

        setLoading(true);
        try {
            // Search for providers based on diagnosis
            const response = await fetch('/api/ai/instant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `${diagnosis.problem} - ${diagnosis.description}`,
                }),
            });

            const data = await response.json();
            setProviders(data.providers || []);
            setStep('providers');
        } catch (error) {
            console.error('Provider search error:', error);
            alert('Gagal mencari mitra. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSaveEdit = () => {
        setEditMode(false);
    };

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">
            {/* Header */}
            <div className="bg-gradient-soft border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 py-6">
                    <h1 className="text-2xl md:text-3xl font-bold font-heading">
                        ANDALAN Instant
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {mode === 'chat' ? 'Chat dengan AI untuk solusi cepat' : 'Foto masalah, AI diagnosa, langsung cari mitra'}
                    </p>

                    {/* Mode Toggle */}
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={() => setMode('chat')}
                            variant={mode === 'chat' ? 'default' : 'outline'}
                            className="rounded-xl flex items-center gap-2"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Chat AI
                        </Button>
                        <Button
                            onClick={() => setMode('foto')}
                            variant={mode === 'foto' ? 'default' : 'outline'}
                            className="rounded-xl flex items-center gap-2"
                        >
                            <Camera className="h-4 w-4" />
                            Foto Masalah
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Chat Mode */}
                {mode === 'chat' && <InstantChatMode />}

                {/* Foto Mode */}
                {mode === 'foto' && (
                    <>
                        {/* Step 1: Camera Mode */}
                        {step === 'camera' && (
                            <div className="max-w-2xl mx-auto">
                                <CameraCapture
                                    onCapture={handleCameraCapture}
                                    onCancel={() => setStep('upload')}
                                />
                            </div>
                        )}

                        {/* Step 1: Upload Photo or Text */}
                        {step === 'upload' && (
                            <div className="max-w-2xl mx-auto space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-bold font-heading mb-4">
                                            Ambil Foto atau Upload Gambar
                                        </h2>

                                        {/* Image Preview or Dual Options */}
                                        <div className="space-y-4">
                                            {image ? (
                                                <div className="space-y-4">
                                                    <img
                                                        src={image}
                                                        alt="Preview"
                                                        className="max-h-64 mx-auto rounded-lg"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setImage(null)}
                                                        className="w-full rounded-xl"
                                                    >
                                                        Ganti Foto
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Camera Button */}
                                                    <button
                                                        onClick={() => setStep('camera')}
                                                        className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                                                    >
                                                        <div className="space-y-3">
                                                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                                                <Camera className="h-8 w-8 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">Ambil Foto</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Gunakan kamera
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </button>

                                                    {/* Upload Button */}
                                                    <label className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                        />
                                                        <div className="space-y-3">
                                                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                                                <ImageIcon className="h-8 w-8 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">Upload Foto</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Pilih dari galeri
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            )}

                                            {/* Text Input */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    Atau Deskripsikan Masalah (Opsional)
                                                </label>
                                                <Textarea
                                                    placeholder="Contoh: AC tidak dingin, ada bunyi aneh dari mesin..."
                                                    value={textInput}
                                                    onChange={(e) => setTextInput(e.target.value)}
                                                    rows={4}
                                                    className="rounded-xl"
                                                />
                                            </div>

                                            <Button
                                                onClick={handleAnalyze}
                                                disabled={(!image && !textInput) || loading}
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
                                                        <Search className="h-5 w-5 mr-2" />
                                                        Analisis dengan AI
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Step 2: Diagnosis Result */}
                        {step === 'diagnosis' && diagnosis && (
                            <div className="max-w-2xl mx-auto space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold font-heading">
                                                        Hasil Diagnosis AI
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">
                                                        Validasi atau edit hasil di bawah
                                                    </p>
                                                </div>
                                            </div>
                                            {!editMode && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleEdit}
                                                    className="rounded-xl"
                                                >
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            {/* Problem */}
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">
                                                    Masalah Terdeteksi
                                                </label>
                                                {editMode ? (
                                                    <Input
                                                        value={diagnosis.problem}
                                                        onChange={(e) =>
                                                            setDiagnosis({ ...diagnosis, problem: e.target.value })
                                                        }
                                                        className="mt-1 rounded-xl"
                                                    />
                                                ) : (
                                                    <p className="text-lg font-medium mt-1">{diagnosis.problem}</p>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">
                                                    Deskripsi Detail
                                                </label>
                                                {editMode ? (
                                                    <Textarea
                                                        value={diagnosis.description}
                                                        onChange={(e) =>
                                                            setDiagnosis({ ...diagnosis, description: e.target.value })
                                                        }
                                                        rows={3}
                                                        className="mt-1 rounded-xl"
                                                    />
                                                ) : (
                                                    <p className="mt-1">{diagnosis.description}</p>
                                                )}
                                            </div>

                                            {/* Urgency & Service */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground">
                                                        Tingkat Urgensi
                                                    </label>
                                                    <div
                                                        className={`mt-1 px-3 py-2 rounded-xl font-medium capitalize ${diagnosis.urgency === 'high'
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                            : diagnosis.urgency === 'medium'
                                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                            }`}
                                                    >
                                                        {diagnosis.urgency}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground">
                                                        Estimasi Biaya
                                                    </label>
                                                    <p className="mt-1 px-3 py-2 rounded-xl bg-primary/10 text-primary font-medium">
                                                        {diagnosis.price_estimation}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Recommended Service */}
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">
                                                    Layanan yang Direkomendasikan
                                                </label>
                                                <p className="mt-1 font-medium capitalize">
                                                    {diagnosis.recommended_service.replace(/_/g, ' ')}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-3 pt-4">
                                                {editMode ? (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setEditMode(false)}
                                                            className="flex-1 rounded-xl"
                                                        >
                                                            Batal
                                                        </Button>
                                                        <Button
                                                            onClick={handleSaveEdit}
                                                            className="flex-1 rounded-xl bg-gradient-primary text-white"
                                                        >
                                                            Simpan
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setStep('upload')}
                                                            className="flex-1 rounded-xl"
                                                        >
                                                            Kembali
                                                        </Button>
                                                        <Button
                                                            onClick={handleApprove}
                                                            disabled={loading}
                                                            className="flex-1 rounded-xl bg-gradient-primary text-white"
                                                        >
                                                            {loading ? (
                                                                <>
                                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                    Mencari...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                                                    Approve & Cari Mitra
                                                                </>
                                                            )}
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Preview Image */}
                                {image && (
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="text-sm font-medium mb-2">Foto yang Dianalisis:</p>
                                            <img
                                                src={image}
                                                alt="Analyzed"
                                                className="w-full rounded-lg"
                                            />
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        )}

                        {/* Step 3: Provider Results */}
                        {step === 'providers' && (
                            <div className="max-w-4xl mx-auto space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-bold font-heading mb-2">
                                            Mitra yang Tersedia
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Ditemukan {providers.length} mitra untuk masalah:{' '}
                                            <span className="font-medium text-foreground">
                                                {diagnosis?.problem}
                                            </span>
                                        </p>

                                        {providers.length === 0 ? (
                                            <div className="text-center py-12">
                                                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                                                </div>
                                                <h3 className="font-bold mb-2">Belum Ada Mitra Tersedia</h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Saat ini belum ada mitra yang online untuk layanan ini
                                                </p>
                                                <Button
                                                    onClick={() => setStep('upload')}
                                                    variant="outline"
                                                    className="rounded-xl"
                                                >
                                                    Coba Lagi
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4 md:grid-cols-2">
                                                {providers.map((provider) => (
                                                    <ProviderCard
                                                        key={provider.id}
                                                        provider={provider}
                                                        onSelect={(id) => {
                                                            // TODO: Navigate to order page
                                                            router.push(`/order?providerId=${id}&diagnosis=${JSON.stringify(diagnosis)}`);
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <div className="flex justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep('diagnosis')}
                                        className="rounded-xl"
                                    >
                                        Kembali ke Diagnosis
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
