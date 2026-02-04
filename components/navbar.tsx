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
        { label: 'Chat', href: '/chat', icon: MessageSquare },
        { label: 'Market', href: '/marketplace', icon: Briefcase },
        { label: 'Profil', href: '/profile', icon: User },
    ];

    return (
        <>
            {/* Top Header - Clean & Elegant */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="text-xl md:text-2xl font-bold font-heading text-primary tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-sm">
                            <Zap className="h-4 w-4 fill-current" />
                        </div>
                        <span className="hidden sm:inline">ANDALAN</span>
                    </Link>

                    {/* Desktop Nav - Simplified */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 md:gap-3">
                        <ThemeToggle />
                        <div className="hidden md:flex gap-2">
                            <Button variant="ghost" size="sm" className="rounded-xl text-muted-foreground hover:text-primary">Masuk</Button>
                            <Button size="sm" className="rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity text-white border-0 shadow-sm">
                                Daftar
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer to prevent content overlap */}
            <div className="h-16" />

            {/* Mobile Bottom Navigation - Enhanced Touch Targets */}
            <nav className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 shadow-elegant">
                <div className="flex h-16 items-center justify-around px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]",
                                    isActive
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground active:bg-secondary/50"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive && "fill-current")} />
                                <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

        </>
    );
}

