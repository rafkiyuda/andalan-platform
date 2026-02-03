'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function InstantChatMode() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/instant/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.message,
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-280px)] md:h-auto max-w-4xl mx-auto">
            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto pb-20 md:pb-4 space-y-4">
                {/* Welcome Message */}
                {messages.length === 0 && (
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="p-4 md:p-6">
                            <div className="flex items-start gap-3 md:gap-4">
                                <div className="p-2 md:p-3 rounded-full bg-primary/10 shrink-0">
                                    <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-base md:text-lg mb-2">Chat dengan Andalan AI</h3>
                                    <p className="text-xs md:text-sm text-muted-foreground mb-3">
                                        Ceritakan masalah atau kebutuhan jasa Anda, dan saya akan membantu menemukan solusi terbaik.
                                    </p>
                                    <div className="text-[10px] md:text-xs text-muted-foreground space-y-0.5 md:space-y-1">
                                        <p>💡 <strong>Tips:</strong> Jelaskan masalahnya dengan detail</p>
                                        <p>📷 Punya foto? Switch ke mode "Foto" untuk diagnosis visual</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Chat Messages */}
                {messages.length > 0 && (
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-secondary rounded-2xl px-4 py-3">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Area - Sticky at bottom with no gap */}
            <div className="sticky bottom-0 left-0 right-0 bg-background border-t md:border-t-0 md:bottom-auto md:static px-4 md:px-0 py-2 md:py-0">
                <Card className="md:shadow-lg border-0 md:border">
                    <CardContent className="p-2 md:p-4">
                        <div className="flex gap-2 md:gap-3">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ketik pertanyaan atau masalah Anda di sini..."
                                className="min-h-[44px] md:min-h-[60px] resize-none rounded-xl text-xs md:text-base bg-muted/30 border border-input"
                                disabled={loading}
                                rows={1}
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="rounded-xl bg-gradient-primary text-white self-end h-[44px] md:h-auto"
                                size="icon"
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4 md:h-5 md:w-5" />
                                )}
                            </Button>
                        </div>
                        <p className="text-[9px] md:text-xs text-muted-foreground mt-1 md:mt-2 hidden md:block">
                            Tekan Enter untuk kirim, Shift+Enter untuk baris baru
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
