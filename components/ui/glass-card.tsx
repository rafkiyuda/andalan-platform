import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    border?: boolean;
}

export function GlassCard({ children, className, border = true, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "glass rounded-2xl p-6 transition-all duration-300",
                border ? "" : "border-none",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
