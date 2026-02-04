"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { WorkerRecommendationCard } from "@/components/worker-recommendation-card";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    workerIds?: string[];
}

interface Worker {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    totalJobs: number;
    location: string;
    skills: string[];
    priceRange?: string;
    pricePerHour?: number;
    isVerified: boolean;
    avatar?: string;
}

function ChatContent() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [workers, setWorkers] = useState<Record<string, Worker>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    // Auto-fill input from URL query if present
    useEffect(() => {
        const q = searchParams.get("q");
        if (q && input === "" && messages.length === 0) {
            setInput(q);
        }
    }, [searchParams, input, messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            const assistantId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, {
                id: assistantId,
                role: 'assistant',
                content: '',
            }]);

            if (!reader) throw new Error('No reader available');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                assistantMessage += chunk;

                setMessages(prev => prev.map(msg =>
                    msg.id === assistantId
                        ? { ...msg, content: assistantMessage }
                        : msg
                ));
            }
        } catch (error) {
            console.error('Chat error:', error);
            alert('Gagal mengirim pesan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-64px)]">
            {/* Messages Area - scrollable */}
            <div className="flex-1 overflow-y-auto md:p-6 p-4 pb-32 md:pb-24 scrollbar-hide">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-start text-center space-y-3 md:space-y-6 pt-4 md:pt-16">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                            <div className="relative bg-background p-2 md:p-4 rounded-2xl border shadow-lg">
                                <Sparkles className="h-6 w-6 md:h-10 md:w-10 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-1 md:space-y-2 max-w-md px-4">
                            <h2 className="text-lg md:text-2xl font-bold tracking-tight">
                                Ada masalah apa hari ini?
                            </h2>
                            <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                                Ceritakan kebutuhan Anda, dan Andalan AI akan mencarikan profesional
                                terbaik untuk menyelesaikannya.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm text-left w-full max-w-md px-4">
                            <button
                                onClick={() => setInput("Pipa air di dapur bocor")}
                                className="p-2.5 md:p-3 bg-muted/50 hover:bg-muted rounded-xl border transition-colors text-left text-xs md:text-sm"
                            >
                                &quot;Pipa air di dapur bocor&quot;
                            </button>
                            <button
                                onClick={() => setInput("Butuh guru les matematika SD")}
                                className="p-2.5 md:p-3 bg-muted/50 hover:bg-muted rounded-xl border transition-colors text-left text-xs md:text-sm"
                            >
                                &quot;Butuh guru les matematika SD&quot;
                            </button>
                        </div>
                    </div>
                )}

                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex w-full mb-4",
                            m.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "flex gap-3 max-w-[85%] md:max-w-[75%]",
                                m.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div
                                className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                                    m.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-background text-foreground"
                                )}
                            >
                                {m.role === "user" ? (
                                    <User className="h-5 w-5" />
                                ) : (
                                    <Bot className="h-5 w-5 text-primary" />
                                )}
                            </div>
                            <div
                                className={cn(
                                    "rounded-2xl p-4 shadow-sm",
                                    m.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-none"
                                        : "bg-card text-card-foreground border rounded-tl-none"
                                )}
                            >
                                <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                                    {m.role === "user" ? (
                                        <div className="whitespace-pre-wrap">{m.content}</div>
                                    ) : (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="mb-2 ml-4 list-disc" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="mb-2 ml-4 list-decimal" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                                em: ({ node, ...props }) => <em className="italic" {...props} />,
                                                code: ({ node, ...props }) => <code className="bg-muted px-1 py-0.5 rounded text-xs" {...props} />,
                                                h3: ({ node, ...props }) => <h3 className="font-bold text-base mb-2" {...props} />,
                                            }}
                                        >
                                            {m.content}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start w-full mb-4">
                        <div className="flex gap-3 max-w-[85%]">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 border bg-background text-foreground shadow-sm">
                                <Bot className="h-5 w-5 text-primary animate-pulse" />
                            </div>
                            <div className="rounded-2xl p-4 bg-muted/50 rounded-tl-none flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom on mobile, above nav bar */}
            <div className="fixed md:sticky bottom-16 md:bottom-4 left-0 right-0 bg-background border-t md:border-t-0 md:px-6 px-4 py-3 md:py-0 z-40">
                <div className="max-w-3xl mx-auto md:bg-background/80 md:backdrop-blur-lg md:border md:rounded-2xl md:p-2 md:shadow-lg md:ring-1 md:ring-black/5 dark:md:ring-white/10">
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 relative"
                    >
                        <Input
                            className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 md:px-4 py-3 md:py-6 text-sm md:text-base shadow-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ketik pesan Anda disini..."
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input?.trim() || isLoading}
                            className="h-9 w-9 md:h-10 md:w-10 rounded-xl shrink-0"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            }
        >
            <ChatContent />
        </Suspense>
    );
}
