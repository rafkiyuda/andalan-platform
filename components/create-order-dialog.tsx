'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';

interface CreateOrderDialogProps {
    onOrderCreated?: () => void;
}

const serviceTypes = [
    { value: 'formal', label: 'Formal' },
    { value: 'informal', label: 'Informal' },
];

const popularServices = [
    'Perbaikan AC',
    'Perbaikan Kulkas',
    'Tukang Ledeng',
    'Cleaning Service',
    'Service Motor',
    'Perbaikan Komputer',
    'Guru Les Privat',
    'Tukang Taman',
];

export function CreateOrderDialog({ onOrderCreated }: CreateOrderDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        serviceType: '',
        serviceName: '',
        description: '',
        price: '',
        location: '',
        scheduledAt: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get user ID from session or use temp ID
            const userId = localStorage.getItem('userId') || 'temp-user-' + Date.now();
            localStorage.setItem('userId', userId);

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId,
                    price: parseFloat(formData.price) || 0,
                }),
            });

            if (response.ok) {
                // Reset form
                setFormData({
                    serviceType: '',
                    serviceName: '',
                    description: '',
                    price: '',
                    location: '',
                    scheduledAt: '',
                });
                setOpen(false);
                onOrderCreated?.();
            } else {
                const error = await response.json();
                alert(error.error || 'Gagal membuat pesanan');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Gagal membuat pesanan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-xl bg-gradient-primary text-white hover:opacity-90 transition-opacity">
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Pesanan Baru
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Buat Pesanan Baru</DialogTitle>
                    <DialogDescription>
                        Isi detail pesanan yang Anda butuhkan
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {/* Service Type */}
                    <div className="space-y-2">
                        <Label htmlFor="serviceType">Tipe Layanan</Label>
                        <Select
                            value={formData.serviceType}
                            onValueChange={(value) =>
                                setFormData({ ...formData, serviceType: value })
                            }
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih tipe layanan" />
                            </SelectTrigger>
                            <SelectContent>
                                {serviceTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Service Name */}
                    <div className="space-y-2">
                        <Label htmlFor="serviceName">Nama Layanan</Label>
                        <Select
                            value={formData.serviceName}
                            onValueChange={(value) =>
                                setFormData({ ...formData, serviceName: value })
                            }
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih layanan" />
                            </SelectTrigger>
                            <SelectContent>
                                {popularServices.map((service) => (
                                    <SelectItem key={service} value={service}>
                                        {service}
                                    </SelectItem>
                                ))}
                                <SelectItem value="Lainnya">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Custom Service Name */}
                    {formData.serviceName === 'Lainnya' && (
                        <div className="space-y-2">
                            <Label htmlFor="customServiceName">Nama Layanan Custom</Label>
                            <Input
                                id="customServiceName"
                                placeholder="Masukkan nama layanan"
                                value={formData.serviceName === 'Lainnya' ? '' : formData.serviceName}
                                onChange={(e) =>
                                    setFormData({ ...formData, serviceName: e.target.value })
                                }
                                required
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            placeholder="Jelaskan detail kebutuhan Anda..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            required
                            rows={3}
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Budget (Rp)</Label>
                        <Input
                            id="price"
                            type="number"
                            placeholder="0"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: e.target.value })
                            }
                            required
                            min="0"
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location">Lokasi (Opsional)</Label>
                        <Input
                            id="location"
                            placeholder="Jakarta Selatan"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({ ...formData, location: e.target.value })
                            }
                        />
                    </div>

                    {/* Scheduled Date */}
                    <div className="space-y-2">
                        <Label htmlFor="scheduledAt">Jadwal (Opsional)</Label>
                        <Input
                            id="scheduledAt"
                            type="datetime-local"
                            value={formData.scheduledAt}
                            onChange={(e) =>
                                setFormData({ ...formData, scheduledAt: e.target.value })
                            }
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Buat Pesanan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
