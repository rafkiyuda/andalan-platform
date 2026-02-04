import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Briefcase, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface WorkerRecommendationCardProps {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    totalJobs: number;
    location: string;
    skills: string[];
    priceRange?: string;
    pricePerHour?: number;
    isVerified: boolean;
    avatar?: string;
}

export function WorkerRecommendationCard({
    id,
    name,
    specialization,
    rating,
    totalJobs,
    location,
    skills,
    priceRange,
    pricePerHour,
    isVerified,
    avatar
}: WorkerRecommendationCardProps) {
    const displayPrice = pricePerHour
        ? `Rp ${pricePerHour.toLocaleString('id-ID')}/jam`
        : priceRange
            ? `Rp ${priceRange}`
            : 'Hubungi untuk harga';

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-primary/50">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        {isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                                <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                                <h3 className="font-semibold text-base leading-tight flex items-center gap-2">
                                    {name}
                                    {isVerified && (
                                        <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                            Verified
                                        </Badge>
                                    )}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate">{specialization}</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>{totalJobs} jobs</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="truncate">{location}</span>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-3">
                            {skills.slice(0, 3).map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs px-2 py-0.5">
                                    {skill}
                                </Badge>
                            ))}
                            {skills.length > 3 && (
                                <Badge variant="outline" className="text-xs px-2 py-0.5">
                                    +{skills.length - 3}
                                </Badge>
                            )}
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between gap-2 mt-4">
                            <div className="text-sm font-semibold text-primary">
                                {displayPrice}
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/provider/${id}`} className="flex-1">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Lihat Profile
                                    </Button>
                                </Link>
                                <Link href={`/provider/${id}`} className="flex-1">
                                    <Button
                                        size="sm"
                                        className="w-full"
                                    >
                                        <Phone className="w-3.5 h-3.5 mr-1" />
                                        Hubungi
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
