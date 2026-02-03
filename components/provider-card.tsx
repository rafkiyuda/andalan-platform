'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ProviderCardProps {
    provider: {
        id: string;
        name: string;
        avatar?: string;
        rating?: number;
        totalJobs: number;
        location?: string;
        services: string[];
    };
    onSelect?: (id: string) => void;
    showDistance?: boolean;
    distance?: number;
}

export function ProviderCard({
    provider,
    onSelect,
    showDistance,
    distance,
}: ProviderCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/provider/${provider.id}`);
    };

    return (
        <Card
            className="card-hover overflow-hidden cursor-pointer"
            onClick={handleCardClick}
        >
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
                            {provider.avatar ? (
                                <img
                                    src={provider.avatar}
                                    alt={provider.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                provider.name.charAt(0).toUpperCase()
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold font-heading text-lg mb-1">
                            {provider.name}
                        </h3>

                        {/* Rating & Jobs */}
                        <div className="flex items-center gap-3 mb-2">
                            {provider.rating && (
                                <div className="flex items-center gap-1 text-sm">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{provider.rating.toFixed(1)}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Briefcase className="h-4 w-4" />
                                <span>{provider.totalJobs} pekerjaan</span>
                            </div>
                        </div>

                        {/* Location */}
                        {provider.location && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                                <MapPin className="h-4 w-4" />
                                <span>{provider.location}</span>
                                {showDistance && distance && (
                                    <span className="text-primary font-medium">
                                        • {distance.toFixed(1)} km
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Services */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {provider.services.slice(0, 3).map((service, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    {service}
                                </Badge>
                            ))}
                            {provider.services.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{provider.services.length - 3} lainnya
                                </Badge>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 rounded-xl"
                            >
                                <Phone className="h-4 w-4 mr-2" />
                                Hubungi
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => onSelect?.(provider.id)}
                                className="flex-1 rounded-xl bg-gradient-primary text-white"
                            >
                                Pesan
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
