'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
}

export function OTPInput({
    length = 6,
    value,
    onChange,
    onComplete,
}: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (value) {
            setOtp(value.split('').concat(Array(length).fill('')).slice(0, length));
        }
    }, [value, length]);

    const handleChange = (index: number, digit: string) => {
        if (!/^\d*$/.test(digit)) return;

        const newOtp = [...otp];
        newOtp[index] = digit.slice(-1);
        setOtp(newOtp);

        const otpValue = newOtp.join('');
        onChange(otpValue);

        // Auto-focus next input
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Call onComplete when all digits are filled
        if (otpValue.length === length && onComplete) {
            onComplete(otpValue);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('').concat(Array(length).fill('')).slice(0, length);
        setOtp(newOtp);
        onChange(pastedData);

        if (pastedData.length === length && onComplete) {
            onComplete(pastedData);
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
                <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={cn(
                        'w-12 h-14 text-center text-2xl font-bold rounded-xl',
                        'focus:ring-2 focus:ring-primary'
                    )}
                />
            ))}
        </div>
    );
}
