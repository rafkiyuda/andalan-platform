import Link from "next/link";
import { Search, ArrowRight, Zap, Users, Shield, Tag, Star, CheckCircle2, TrendingUp, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { CATEGORIES } from "@/lib/mock-data";
import * as Icons from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Elegant & Soft */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Softer Background Gradients */}
        <div className="absolute inset-0 bg-gradient-soft opacity-60 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Platform Jasa Terpercaya Berbasis AI
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground font-heading leading-tight">
              Solusi Cerdas dalam <br />
              <span className="text-gradient-primary">Satu Genggaman</span>
            </h1>

            <p className="max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed px-4">
              Temukan profesional terbaik untuk setiap kebutuhan, atau biarkan AI kami mendiagnosa masalah Anda secara instan.
            </p>

            {/* Search Bar - Elegant Design */}
            <div className="w-full max-w-2xl relative group z-10 px-4">
              <form action="/chat" className="relative flex items-center bg-background rounded-2xl shadow-elegant border border-border hover:border-primary/30 transition-all duration-300 p-2 pl-6">
                <Search className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                <Input
                  name="q"
                  placeholder="Cari talent atau ketik masalahmu (misal: AC bocor)..."
                  className="border-none shadow-none focus-visible:ring-0 h-12 bg-transparent text-base flex-1"
                />
                <Button type="submit" size="icon" className="h-12 w-12 rounded-xl bg-gradient-primary text-white hover:opacity-90 transition-opacity shrink-0">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                Terverifikasi
              </span>
              <span className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                Respon Cepat
              </span>
              <span className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <Users className="h-3.5 w-3.5" />
                </div>
                Tenaga Ahli
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - BebyNest Inspired */}
      <section className="py-12 md:py-16 bg-background border-y border-border/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading">10,000+</div>
              <div className="text-sm text-muted-foreground">Pengguna Aktif</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading">5,000+</div>
              <div className="text-sm text-muted-foreground">Profesional</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading">98%</div>
              <div className="text-sm text-muted-foreground">Kepuasan</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading">24/7</div>
              <div className="text-sm text-muted-foreground">Dukungan AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-16 md:py-24 bg-secondary/30 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-12 gap-4">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading text-foreground">Kategori Layanan</h2>
              <p className="text-muted-foreground max-w-md">
                Pilih layanan sesuai kebutuhan Anda, dari profesional formal hingga bantuan teknis harian.
              </p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="rounded-xl border-primary/20 hover:bg-primary/5 text-primary">
                Lihat Semua
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {CATEGORIES.map((cat) => (
              <GlassCard key={cat.id} className="space-y-6 hover:border-primary/30 hover:shadow-elegant transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-1 bg-gradient-primary rounded-full"></div>
                  <h3 className="text-xl md:text-2xl font-bold font-heading capitalize group-hover:text-primary transition-colors">{cat.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {cat.items.map((item) => {
                    const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[item.icon] || Icons.HelpCircle;
                    return (
                      <Link href={`/search?category=${cat.id}&q=${item.name}`} key={item.id}>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/50 hover:bg-background border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-sm cursor-pointer group/item h-28 md:h-32 text-center">
                          <div className="p-2.5 md:p-3 rounded-xl bg-secondary text-foreground group-hover/item:bg-primary group-hover/item:text-white transition-colors mb-2">
                            <IconComponent className="h-4 w-4 md:h-5 md:w-5" />
                          </div>
                          <span className="font-medium text-xs md:text-sm text-foreground/80 group-hover/item:text-foreground">{item.name}</span>
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
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading">Kenapa Harus Andalan?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">Platform kami didesain untuk memberikan keamanan, kecepatan, dan transparansi harga.</p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover bg-gradient-to-br from-white to-blue-50/50 dark:from-card dark:to-blue-950/10 border-blue-100/50 dark:border-blue-900/30">
              <CardContent className="p-6 md:p-8">
                <div className="p-3 w-fit rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">Andalan Instant</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Teknologi AI yang mendiagnosa masalah Anda dari foto atau deskripsi, dan langsung merekomendasikan solusinya tanpa menunggu lama.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-white to-indigo-50/50 dark:from-card dark:to-indigo-950/10 border-indigo-100/50 dark:border-indigo-900/30">
              <CardContent className="p-6 md:p-8">
                <div className="p-3 w-fit rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">Andalan Padu</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Gabungkan beberapa vendor spesialis dalam satu paket kerja kolaboratif. Hemat biaya koordinasi dan pengerjaan lebih efisien.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-white to-purple-50/50 dark:from-card dark:to-purple-950/10 border-purple-100/50 dark:border-purple-900/30 md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 md:p-8">
                <div className="p-3 w-fit rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-6">
                  <Tag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">Andalan Harga</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Smart Pricing Benchmark menjamin harga wajar sesuai pasar real-time. Transparansi total, tidak ada hidden cost atau harga tembak.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section - BebyNest Inspired */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading">Cerita dari Pengguna Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Lihat bagaimana Andalan membantu ribuan orang menyelesaikan masalah mereka dengan cepat dan mudah.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed text-sm md:text-base">
                  "Andalan Instant benar-benar membantu! AC saya rusak dan dalam hitungan menit sudah dapat rekomendasi teknisi terbaik. Pelayanan cepat dan harga transparan."
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Sarah Wijaya</div>
                    <div className="text-xs text-muted-foreground">Ibu Rumah Tangga</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed text-sm md:text-base">
                  "Sebagai freelancer, saya sering butuh bantuan untuk berbagai hal. Andalan jadi solusi one-stop untuk semua kebutuhan saya. Sangat praktis!"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                    D
                  </div>
                  <div>
                    <div className="font-semibold text-sm">David Pratama</div>
                    <div className="text-xs text-muted-foreground">Freelance Designer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed text-sm md:text-base">
                  "Harga yang ditawarkan sangat kompetitif dan tidak ada biaya tersembunyi. Saya sudah pakai Andalan untuk renovasi rumah dan hasilnya memuaskan!"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Jessica Tan</div>
                    <div className="text-xs text-muted-foreground">Pengusaha</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant & Simple */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

        <div className="container relative px-4 md:px-6 text-center space-y-6 md:space-y-8 mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white max-w-3xl mx-auto leading-tight">
            Siap Selesaikan Masalah Anda?
          </h2>
          <p className="text-blue-50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Bergabunglah dengan ribuan pengguna yang telah terbantu oleh ekosistem Andalan. Solusi cepat, tepat, dan hemat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-xl px-8 bg-white text-primary hover:bg-white/90 h-12 md:h-14 text-base font-semibold shadow-xl w-full sm:w-auto">
              Mulai Sekarang
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 border-white/30 bg-white/10 text-white hover:bg-white/20 h-12 md:h-14 text-base font-semibold w-full sm:w-auto">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
