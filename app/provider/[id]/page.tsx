'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, MapPin, Briefcase, Phone, MessageCircle, CheckCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getProviderById } from '@/lib/mock-providers';
import Image from 'next/image';

export default function ProviderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const providerId = params.id as string;

    const provider = getProviderById(providerId);

    if (!provider) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-2">Provider Tidak Ditemukan</h1>
                <p className="text-muted-foreground mb-4">Provider yang Anda cari tidak tersedia.</p>
                <Button onClick={() => router.back()}>Kembali</Button>
            </div>
        );
    }

    const averageRating = provider.rating;
    const formattedPrice = `Rp ${provider.priceRange.min.toLocaleString('id-ID')} - ${provider.priceRange.max.toLocaleString('id-ID')}`;

    return (
        <div className="min-h-screen bg-background pb-24 md:pb-8">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-bold text-lg">Detail Provider</h1>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Provider Info Card */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex justify-center md:justify-start">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/10">
                                        <Image
                                            src={provider.avatar}
                                            alt={provider.name}
                                            width={128}
                                            height={128}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    {provider.verified && (
                                        <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                                            <CheckCircle className="h-5 w-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <h2 className="text-2xl font-bold font-heading">{provider.name}</h2>
                                    {provider.verified && (
                                        <Badge variant="default" className="bg-blue-500">
                                            Terverifikasi
                                        </Badge>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
                                        <span className="text-muted-foreground text-sm">
                                            ({provider.reviews.length} ulasan)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <Briefcase className="h-4 w-4" />
                                        <span className="text-sm">{provider.totalJobs} pekerjaan</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center justify-center md:justify-start gap-1.5 text-muted-foreground mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{provider.location}</span>
                                </div>

                                {/* Availability */}
                                <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                                    {provider.availability}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Services */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4">Layanan</h3>
                        <div className="flex flex-wrap gap-2">
                            {provider.services.map((service, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1.5">
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* About */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3">Tentang</h3>
                        <p className="text-muted-foreground leading-relaxed">{provider.bio}</p>
                    </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3">Kisaran Harga</h3>
                        <p className="text-2xl font-bold text-primary">{formattedPrice}</p>
                        <p className="text-xs text-muted-foreground mt-1">*Harga dapat bervariasi tergantung kompleksitas pekerjaan</p>
                    </CardContent>
                </Card>

                {/* Reviews */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4">
                            Ulasan ({provider.reviews.length})
                        </h3>
                        <div className="space-y-4">
                            {provider.reviews.map((review) => (
                                <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shrink-0">
                                            {review.userName.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold text-sm">{review.userName}</h4>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(review.date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-3.5 w-3.5 ${i < Math.floor(review.rating)
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    {review.service}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-background border-t p-4 z-10">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 rounded-xl"
                        onClick={() => window.open(`tel:${provider.phone}`)}
                    >
                        <Phone className="h-4 w-4 mr-2" />
                        Telepon
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 rounded-xl"
                        onClick={() => window.open(`https://wa.me/${provider.phone.replace('+', '')}`)}
                    >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                    </Button>
                    <Button
                        size="lg"
                        className="flex-1 rounded-xl bg-gradient-primary text-white"
                        onClick={() => router.push(`/order?providerId=${provider.id}`)}
                    >
                        Pesan Sekarang
                    </Button>
                </div>
            </div>
        </div>
    );
}
