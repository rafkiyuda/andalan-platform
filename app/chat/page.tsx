"use client";

import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

function ChatContent() {
    const { messages, input, setInput, append, isLoading, error } = useChat({
        onError: (error) => {
            console.error('Chat error:', error);
            alert('Gagal mengirim pesan: ' + error.message);
        },
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    // Auto-fill input from URL query if present (from Home search)
    useEffect(() => {
        const q = searchParams.get("q");
        if (q && input === "" && messages.length === 0) {
            setInput(q);
        }
    }, [searchParams, input, messages.length, setInput]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const renderMessageContent = (m: any) => {
        return m.content || "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        console.log('Sending message:', input);
        await append({
            role: 'user',
            content: input,
        });
        setInput('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto md:p-6 p-4">
            <div className="flex-1 overflow-y-auto space-y-6 pb-20 scrollbar-hide">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 min-h-[50vh]">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                            <div className="relative bg-background p-4 rounded-2xl border shadow-lg">
                                <Sparkles className="h-10 w-10 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-2 max-w-md">
                            <h2 className="text-2xl font-bold tracking-tight">
                                Ada masalah apa hari ini?
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Ceritakan kebutuhan Anda, dan Andalan AI akan mencarikan profesional
                                terbaik untuk menyelesaikannya.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-left w-full max-w-md">
                            <button
                                onClick={() => setInput("Pipa air di dapur bocor")}
                                className="p-3 bg-muted/50 hover:bg-muted rounded-xl border transition-colors truncate"
                            >
                                &quot;Pipa air di dapur bocor&quot;
                            </button>
                            <button
                                onClick={() => setInput("Butuh guru les matematika SD")}
                                className="p-3 bg-muted/50 hover:bg-muted rounded-xl border transition-colors truncate"
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
                            "flex w-full",
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
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {renderMessageContent(m)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start w-full">
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

            <div className="sticky bottom-4 mx-auto w-full max-w-3xl bg-background/80 backdrop-blur-lg border rounded-2xl p-2 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 relative"
                >
                    <Input
                        className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-6 text-base shadow-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ketik pesan Anda disini..."
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input?.trim() || isLoading}
                        className="h-10 w-10 rounded-xl shrink-0 mr-1"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
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
