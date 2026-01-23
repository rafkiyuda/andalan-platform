'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageSquare, User, Briefcase, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Cari', href: '/search', icon: Search },
        { label: 'Instant', href: '/chat', icon: Zap }, // Highlighted feature
        { label: 'Pesanan', href: '/orders', icon: Briefcase },
        { label: 'Profil', href: '/profile', icon: User },
    ];

    return (
        <>
            {/* Top Header - Visible on all devices now */}
            <header className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/20 bg-background/70 backdrop-blur-xl shadow-soft transition-all duration-300">
                <div className="flex h-16 items-center justify-between px-6">
                    <Link href="/" className="text-2xl font-bold font-heading text-primary tracking-tight flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white">
                            <Zap className="h-5 w-5 fill-current" />
                        </div>
                        ANDALAN
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-white/10">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-background text-primary shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <div className="hidden md:flex gap-2">
                            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-primary">Masuk</Button>
                            <Button size="sm" className="rounded-full bg-gradient-primary hover:opacity-90 transition-opacity text-white border-0 shadow-glow">
                                Daftar Partner
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer to prevent content overlap since header is fixed */}
            <div className="h-24 md:h-28" />

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t bg-background/90 backdrop-blur-lg md:hidden pb-safe shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] rounded-t-3xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-2 transition-all duration-200 w-16",
                                isActive
                                    ? "text-primary translate-y-[-4px]"
                                    : "text-muted-foreground hover:text-primary/70"
                            )}
                        >
                            <div className={cn(
                                "p-1.5 rounded-xl transition-all",
                                isActive ? "bg-primary/10" : "bg-transparent"
                            )}>
                                <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                            </div>
                            <span className={cn("text-[10px] font-medium", isActive ? "font-bold" : "")}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}

