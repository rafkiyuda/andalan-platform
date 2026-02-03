'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, RotateCw, X, Check, AlertCircle } from 'lucide-react';

interface CameraCaptureProps {
    onCapture: (imageData: string) => void;
    onCancel: () => void;
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, [facingMode]);

    const startCamera = async () => {
        try {
            setError(null);

            // Stop existing stream if any
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false
            });

            setStream(mediaStream);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error('Camera error:', err);
            setError('Tidak dapat mengakses kamera. Pastikan izin kamera diaktifkan.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const handleCapture = () => {
        // Start countdown
        setCountdown(3);

        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev === null || prev <= 1) {
                    clearInterval(countdownInterval);
                    capturePhoto();
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert to base64 image with compression
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            setCapturedImage(imageData);
            stopCamera();
        }
    };

    const handleRetake = () => {
        setCapturedImage(null);
        startCamera();
    };

    const handleConfirm = () => {
        if (capturedImage) {
            onCapture(capturedImage);
        }
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    if (error) {
        return (
            <Card className="p-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Kamera Tidak Dapat Diakses</h3>
                        <p className="text-sm text-muted-foreground mb-4">{error}</p>
                        <div className="text-xs text-muted-foreground mb-4">
                            <p>Pastikan:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Browser memiliki izin untuk mengakses kamera</li>
                                <li>Tidak ada aplikasi lain yang menggunakan kamera</li>
                                <li>Kamera terhubung dengan baik (jika menggunakan webcam)</li>
                            </ul>
                        </div>
                    </div>
                    <Button onClick={onCancel} variant="outline" className="rounded-xl">
                        Kembali
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="relative bg-black">
                {capturedImage ? (
                    // Show captured image
                    <div className="relative">
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="w-full h-auto max-h-[70vh] object-contain"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                                size="icon"
                                variant="secondary"
                                onClick={handleRetake}
                                className="rounded-full"
                            >
                                <RotateCw className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    // Show live camera feed
                    <div className="relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-auto max-h-[70vh] object-contain"
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Countdown overlay */}
                        {countdown !== null && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="text-white text-8xl font-bold animate-pulse">
                                    {countdown}
                                </div>
                            </div>
                        )}

                        {/* Camera controls */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                                size="icon"
                                variant="secondary"
                                onClick={toggleCamera}
                                className="rounded-full"
                            >
                                <RotateCw className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="secondary"
                                onClick={onCancel}
                                className="rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="p-4 bg-card">
                {capturedImage ? (
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleRetake}
                            className="flex-1 rounded-xl"
                        >
                            <RotateCw className="h-4 w-4 mr-2" />
                            Ambil Ulang
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            className="flex-1 rounded-xl bg-gradient-primary text-white"
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Gunakan Foto Ini
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <Button
                            onClick={handleCapture}
                            disabled={countdown !== null}
                            className="w-full rounded-xl bg-gradient-primary text-white"
                            size="lg"
                        >
                            <Camera className="h-5 w-5 mr-2" />
                            {countdown !== null ? `Mengambil foto dalam ${countdown}...` : 'Ambil Foto'}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            Posisikan objek dengan jelas dalam frame. Foto akan diambil setelah hitungan mundur.
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
}
