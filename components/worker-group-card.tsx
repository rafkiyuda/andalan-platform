'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, MapPin, Briefcase, Shield, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkerBreakdown {
    specialization: string;
    quantity: number;
    description: string;
    skills_needed: string[];
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

interface WorkerGroupCardProps {
    breakdown: WorkerBreakdown;
    workers: Worker[];
    selectedWorkerIds: string[];
    onWorkerToggle: (workerId: string, selected: boolean) => void;
}

export function WorkerGroupCard({
    breakdown,
    workers,
    selectedWorkerIds,
    onWorkerToggle,
}: WorkerGroupCardProps) {
    const hasEnoughWorkers = workers.length >= breakdown.quantity;

    return (
        <Card className={cn(
            "border-2",
            hasEnoughWorkers ? "border-primary/20" : "border-orange-500/20"
        )}>
            <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-base">{breakdown.specialization}</h3>
                            <Badge variant={hasEnoughWorkers ? "default" : "destructive"} className="text-xs">
                                Butuh {breakdown.quantity} orang
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{breakdown.description}</p>
                    </div>
                </div>

                {/* Workers List */}
                {workers.length === 0 ? (
                    <div className="text-center py-6 bg-muted/30 rounded-lg">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">Belum ada pekerja tersedia</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Untuk spesialisasi ini
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {workers.map((worker) => {
                            const isSelected = selectedWorkerIds.includes(worker.id);
                            const isRecommended = workers.indexOf(worker) < breakdown.quantity;

                            return (
                                <div
                                    key={worker.id}
                                    className={cn(
                                        "p-3 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50",
                                        isSelected
                                            ? "border-primary bg-primary/5"
                                            : "border-border bg-background"
                                    )}
                                    onClick={() => onWorkerToggle(worker.id, !isSelected)}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Checkbox */}
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={(checked: boolean | 'indeterminate') =>
                                                onWorkerToggle(worker.id, checked as boolean)
                                            }
                                            className="mt-1"
                                        />

                                        {/* Avatar */}
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                                            {worker.avatar ? (
                                                <img
                                                    src={worker.avatar}
                                                    alt={worker.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-lg font-bold text-primary">
                                                    {worker.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-bold text-sm truncate">{worker.name}</p>
                                                {worker.isVerified && (
                                                    <Shield className="h-3 w-3 text-blue-500 shrink-0" />
                                                )}
                                                {isRecommended && (
                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                                        Rekomendasi
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Rating & Jobs */}
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-medium">{worker.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Briefcase className="h-3 w-3" />
                                                    <span>{worker.totalJobs} jobs</span>
                                                </div>
                                            </div>

                                            {/* Location & Price */}
                                            <div className="flex items-center justify-between gap-2 text-xs">
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    <span className="truncate">{worker.location}</span>
                                                </div>
                                                {(worker.pricePerHour || worker.priceRange) && (
                                                    <span className="font-medium text-primary shrink-0">
                                                        {worker.priceRange ||
                                                            `Rp ${worker.pricePerHour?.toLocaleString('id-ID')}/jam`}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Skills */}
                                            {worker.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {worker.skills.slice(0, 3).map((skill, i) => (
                                                        <Badge
                                                            key={i}
                                                            variant="outline"
                                                            className="text-[10px] px-1.5 py-0"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                    {worker.skills.length > 3 && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-[10px] px-1.5 py-0"
                                                        >
                                                            +{worker.skills.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Selection Summary */}
                <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        Dipilih: {selectedWorkerIds.length} / {breakdown.quantity}
                    </span>
                    {selectedWorkerIds.length < breakdown.quantity && workers.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                            Pilih {breakdown.quantity - selectedWorkerIds.length} lagi
                        </Badge>
                    )}
                    {selectedWorkerIds.length >= breakdown.quantity && (
                        <Badge variant="default" className="text-xs bg-green-600">
                            ✓ Lengkap
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
