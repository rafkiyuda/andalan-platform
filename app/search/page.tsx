import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import { MOCK_SERVICES, MOCK_PROFILES } from "@/lib/mock-data";

export default function SearchPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const query = typeof searchParams.q === 'string' ? searchParams.q.toLowerCase() : undefined;

    // Filter Logic
    const services = MOCK_SERVICES.filter(service => {
        const matchesCategory = category ? service.category === category : true;
        const matchesQuery = query
            ? service.title.toLowerCase().includes(query) || service.subcategory.toLowerCase().includes(query)
            : true;
        return matchesCategory && matchesQuery;
    }).map(service => {
        const worker = MOCK_PROFILES.find(p => p.id === service.worker_id);
        return { ...service, worker };
    });

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading mb-2">
                        {query ? `Hasil pencarian "${query}"` : category ? `Kategori: ${category}` : 'Semua Layanan'}
                    </h1>
                    <p className="text-muted-foreground">{services.length} layanan ditemukan</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {['All', 'Formal', 'Informal'].map(filter => (
                        <Link key={filter} href={filter === 'All' ? '/search' : `/search?category=${filter.toLowerCase()}`}>
                            <Button variant={filter.toLowerCase() === (category || 'all') ? 'default' : 'outline'} size="sm" className="rounded-full">
                                {filter}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((item) => (
                    <Link key={item.id} href={`/provider/${item.worker_id}`}>
                        <Card className="hover:shadow-lg transition-all h-full flex flex-col group cursor-pointer overflow-hidden border-primary/10">
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center text-muted-foreground">
                                    {item.subcategory} Image
                                </div>
                            </div>
                            <CardContent className="p-4 flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-100 px-2 py-1 rounded-full">
                                        <Star className="h-3 w-3 fill-current" />
                                        {item.worker?.rating}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>

                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.worker?.avatar_url} alt={item.worker?.full_name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium flex items-center gap-1">
                                            {item.worker?.full_name}
                                            {item.worker?.verified_status === 'verified' && <ShieldCheck className="h-3 w-3 text-blue-500" />}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 border-t bg-accent/10 flex justify-between items-center text-sm font-medium mt-auto">
                                <span>Mulai dari</span>
                                <span className="text-primary text-lg">Rp {item.price.toLocaleString('id-ID')}</span>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

            {services.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">Tidak ada layanan yang ditemukan.</p>
                    <Button variant="link"><Link href="/search">Lihat semua layanan</Link></Button>
                </div>
            )}
        </div>
    );
}
