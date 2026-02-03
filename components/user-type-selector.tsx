'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserTypeSelectorProps {
    value: 'customer' | 'mitra';
    onChange: (type: 'customer' | 'mitra') => void;
}

export function UserTypeSelector({ value, onChange }: UserTypeSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Card
                className={cn(
                    'cursor-pointer transition-all duration-200 hover:shadow-lg',
                    value === 'customer'
                        ? 'ring-2 ring-primary shadow-lg'
                        : 'hover:ring-1 hover:ring-border'
                )}
                onClick={() => onChange('customer')}
            >
                <CardContent className="p-6 text-center">
                    <div
                        className={cn(
                            'mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center',
                            value === 'customer'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-secondary text-muted-foreground'
                        )}
                    >
                        <User className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold font-heading mb-2">Customer</h3>
                    <p className="text-sm text-muted-foreground">
                        Saya butuh jasa/layanan
                    </p>
                </CardContent>
            </Card>

            <Card
                className={cn(
                    'cursor-pointer transition-all duration-200 hover:shadow-lg',
                    value === 'mitra'
                        ? 'ring-2 ring-primary shadow-lg'
                        : 'hover:ring-1 hover:ring-border'
                )}
                onClick={() => onChange('mitra')}
            >
                <CardContent className="p-6 text-center">
                    <div
                        className={cn(
                            'mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center',
                            value === 'mitra'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-secondary text-muted-foreground'
                        )}
                    >
                        <Briefcase className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold font-heading mb-2">Mitra/Pekerja</h3>
                    <p className="text-sm text-muted-foreground">
                        Saya menyediakan jasa
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
