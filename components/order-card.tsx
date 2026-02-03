'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, DollarSign, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderCardProps {
    order: {
        id: string;
        serviceName: string;
        serviceType: string;
        description: string;
        status: string;
        price: number;
        location?: string;
        scheduledAt?: string;
        createdAt: string;
        user?: {
            name: string;
        };
    };
    onStatusChange?: (id: string, status: string) => void;
}

const statusConfig = {
    pending: {
        label: 'Menunggu',
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    confirmed: {
        label: 'Dikonfirmasi',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    'in-progress': {
        label: 'Sedang Dikerjakan',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    },
    completed: {
        label: 'Selesai',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    cancelled: {
        label: 'Dibatalkan',
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
    const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Card className="card-hover overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold font-heading">{order.serviceName}</h3>
                            <Badge className={cn('text-xs font-medium', status.color)}>
                                {status.label}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">{order.serviceType}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-primary">{formatPrice(order.price)}</div>
                    </div>
                </div>

                <p className="text-sm text-foreground mb-4 line-clamp-2">{order.description}</p>

                <div className="space-y-2 mb-4">
                    {order.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{order.location}</span>
                        </div>
                    )}
                    {order.scheduledAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Dijadwalkan: {formatDate(order.scheduledAt)}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Dibuat: {formatDate(order.createdAt)}</span>
                    </div>
                </div>

                {order.status === 'pending' && onStatusChange && (
                    <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStatusChange(order.id, 'cancelled')}
                            className="flex-1 rounded-xl"
                        >
                            Batalkan
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => onStatusChange(order.id, 'confirmed')}
                            className="flex-1 rounded-xl bg-gradient-primary text-white"
                        >
                            Konfirmasi
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
