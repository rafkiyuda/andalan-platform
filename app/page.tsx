import Link from "next/link";
import { Search, ArrowRight, Zap, Users, Shield, Tag, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { CATEGORIES } from "@/lib/mock-data";
import * as Icons from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-400/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />

        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Platform Jasa Terpercaya Berbasis AI
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground font-heading leading-[1.1]">
              Solusi Cerdas dalam <br />
              <span className="text-gradient-primary">Satu Genggaman</span>
            </h1>

            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Temukan profesional terbaik untuk setiap kebutuhan, atau biarkan AI kami mendiagnosa masalah Anda secara instan.
            </p>

            {/* Search Bar - Connected to Gemini Logic */}
            <div className="w-full max-w-xl relative group z-10">
              <div className="absolute -inset-1 bg-gradient-primary rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <form action="/chat" className="relative flex items-center bg-background rounded-full shadow-soft border border-border/50 p-2 pl-6">
                <Search className="h-5 w-5 text-muted-foreground mr-3" />
                <Input
                  name="q"
                  placeholder="Cari talent atau ketik masalahmu (misal: AC bocor)..."
                  className="border-none shadow-none focus-visible:ring-0 h-10 bg-transparent text-base"
                />
                <Button type="submit" size="icon" className="h-10 w-10 rounded-full bg-primary text-white hover:bg-primary/90 shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><div className="p-1 rounded-full bg-green-100 text-green-600"><Shield className="h-3 w-3" /></div> Terverifikasi</span>
              <span className="flex items-center gap-2"><div className="p-1 rounded-full bg-blue-100 text-blue-600"><Zap className="h-3 w-3" /></div> Respon Cepat</span>
              <span className="flex items-center gap-2"><div className="p-1 rounded-full bg-orange-100 text-orange-600"><Users className="h-3 w-3" /></div> Tenaga Ahli</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-heading text-foreground">Kategori Layanan</h2>
              <p className="text-muted-foreground max-w-md">
                Pilih layanan sesuai kebutuhan Anda, dari profesional formal hingga bantuan teknis harian.
              </p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 text-primary">Lihat Semua Kategori</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CATEGORIES.map((cat) => (
              <GlassCard key={cat.id} className="space-y-6 hover:border-primary/30 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-10 w-1 bg-gradient-primary rounded-full`}></div>
                  <h3 className="text-2xl font-bold font-heading capitalize group-hover:text-primary transition-colors">{cat.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {cat.items.map((item) => {
                    const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[item.icon] || Icons.HelpCircle;
                    return (
                      <Link href={`/search?category=${cat.id}&q=${item.name}`} key={item.id}>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/50 hover:bg-background border border-transparent hover:border-border transition-all duration-300 hover:shadow-md cursor-pointer group/item h-32 text-center">
                          <div className="p-3 rounded-full bg-secondary text-foreground group-hover/item:bg-primary group-hover/item:text-white transition-colors mb-2">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <span className="font-medium text-sm text-foreground/80 group-hover/item:text-foreground">{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="container relative px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl font-heading">Kenapa Harus Andalan?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Platform kami didesain untuk memberikan keamanan, kecepatan, dan transparansi harga.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="card-hover bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800/50 border-blue-100 dark:border-blue-900/30">
              <div className="p-3 w-fit rounded-2xl bg-blue-100 text-blue-600 mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Andalan Instant</h3>
              <p className="text-muted-foreground leading-relaxed">
                Teknologi AI yang mendiagnosa masalah Anda dari foto atau deskripsi, dan langsung merekomendasikan solusinya tanpa menunggu lama.
              </p>
            </GlassCard>

            <GlassCard className="card-hover bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-900 dark:to-indigo-900/20 border-indigo-100 dark:border-indigo-900/30">
              <div className="p-3 w-fit rounded-2xl bg-indigo-100 text-indigo-600 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Andalan Padu</h3>
              <p className="text-muted-foreground leading-relaxed">
                Gabungkan beberapa vendor spesialis dalam satu paket kerja kolaboratif. Hemat biaya koordinasi dan pengerjaan lebih efisien.
              </p>
            </GlassCard>

            <GlassCard className="card-hover bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-900/20 border-purple-100 dark:border-purple-900/30">
              <div className="p-3 w-fit rounded-2xl bg-purple-100 text-purple-600 mb-6">
                <Tag className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Andalan Harga</h3>
              <p className="text-muted-foreground leading-relaxed">
                Smart Pricing Benchmark menjamin harga wajar sesuai pasar real-time. Transparansi total, tidak ada hidden cost atau harga tembak.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />

        <div className="container relative px-4 md:px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">Siap Selesaikan Masalah Anda?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg md:text-xl">
            Bergabunglah dengan ribuan pengguna yang telah terbantu oleh ekosistem Andalan. Solusi cepat, tepat, dan hemat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90 h-14 text-base font-semibold shadow-2xl">
              Mulai Sekarang
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 h-14 text-base font-semibold">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

