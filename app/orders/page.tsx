'use client';

import { useEffect, useState } from 'react';
import { OrderCard } from '@/components/order-card';
import { Button } from '@/components/ui/button';
import { Package, Filter, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Order {
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
}

const statusFilters = [
    { value: 'all', label: 'Semua' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'confirmed', label: 'Dikonfirmasi' },
    { value: 'in-progress', label: 'Sedang Dikerjakan' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' },
];

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, [selectedStatus]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const url = selectedStatus === 'all'
                ? '/api/orders'
                : `/api/orders?status=${selectedStatus}`;

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">
            {/* Header */}
            <div className="bg-gradient-soft border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Pesanan Saya</h1>
                            <p className="text-muted-foreground">Kelola dan pantau semua pesanan Anda</p>
                        </div>
                        <Button className="rounded-xl bg-gradient-primary text-white hover:opacity-90 transition-opacity">
                            <Plus className="h-4 w-4 mr-2" />
                            Buat Pesanan Baru
                        </Button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 md:px-6 py-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    {statusFilters.map((filter) => (
                        <Button
                            key={filter.value}
                            variant={selectedStatus === filter.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedStatus(filter.value)}
                            className={cn(
                                'rounded-xl whitespace-nowrap',
                                selectedStatus === filter.value
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-secondary'
                            )}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="container mx-auto px-4 md:px-6 pb-8">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-6 rounded-full bg-secondary/50 mb-6">
                            <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold font-heading mb-2">Belum Ada Pesanan</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            {selectedStatus === 'all'
                                ? 'Anda belum memiliki pesanan. Mulai cari layanan yang Anda butuhkan!'
                                : `Tidak ada pesanan dengan status "${statusFilters.find(f => f.value === selectedStatus)?.label}"`}
                        </p>
                        <Button className="rounded-xl bg-gradient-primary text-white hover:opacity-90">
                            <Plus className="h-4 w-4 mr-2" />
                            Buat Pesanan Pertama
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
