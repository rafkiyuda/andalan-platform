import * as React from "react"
import { cn } from "@/lib/utils"

// Actually better to extract `cn` to `lib/utils.ts` but for now I'll duplicate imports or just create utils.
// Let's create lib/utils.ts first in next tool call. I'll define cn here for now and refactor later or just import from where I defined it?
// I defined it in button.tsx, which is bad practice. I should move it.
// I'll create `lib/utils.ts` in this same turn if possible, but write_to_file is one at a time?
// No, I can do parallel tools? The prompt says "Do NOT make multiple parallel calls to this tool ... for the same file".
// But different files is fine. However, write_to_file description says "waitForPreviousTools" defaults to false (parallel).
// But for safety and avoiding race conditions on imports, I should probably do `lib/utils.ts` first.
// I'll stick to defining `cn` inside the component file if I can't wait, but creating `lib/utils.ts` is better.
// I will create `lib/utils.ts` now and update Button later or just import from there.

// Wait, I already wrote Button.tsx which exports `cn`.
// I'll import `cn` from `@/lib/utils` in Card, but `lib/utils` doesn't exist yet.
// I will create `lib/utils.ts` in this step as well.

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-3xl border-none bg-card text-card-foreground shadow-sm glass",
                className
            )}
            {...props}
        />
    )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("text-2xl font-semibold leading-none tracking-tight font-heading", className)}
            {...props}
        />
    )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}
