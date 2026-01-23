import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_PROFILES, MOCK_SERVICES } from "@/lib/mock-data";
import { ShieldCheck, Star, MapPin, Briefcase } from "lucide-react";
import Image from "next/image"; // Note: handling external images requires config, will use img tag for mock

export default function ProfilePage({ params }: { params: { id: string } }) {
    const profile = MOCK_PROFILES.find(p => p.id === params.id);
    const services = MOCK_SERVICES.filter(s => s.worker_id === params.id);

    if (!profile) {
        return <div className="container py-20 text-center">Talent not found</div>;
    }

    return (
        <div className="container px-4 md:px-6 py-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-heading flex items-center gap-2">
                                {profile.full_name}
                                {profile.verified_status === 'verified' && <ShieldCheck className="h-6 w-6 text-blue-500" />}
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                <Briefcase className="h-4 w-4" /> Professional {profile.skills[0]}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">Chat</Button>
                            <Button>Hire Now</Button>
                        </div>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span className="font-bold text-lg">{profile.rating}</span>
                            <span className="text-muted-foreground">({profile.review_count} Reviews)</span>
                        </div>
                        <div>
                            <span className="block font-bold text-lg text-primary">Rp {profile.hourly_rate?.toLocaleString('id-ID')}/hr</span>
                            <span className="text-muted-foreground">Starting Rate</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-accent/50 text-secondary text-xs rounded-full font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services List */}
            <h2 className="text-2xl font-bold font-heading mb-6">Layanan Ditawarkan</h2>
            <div className="grid gap-4">
                {services.map(service => (
                    <Card key={service.id} className="flex flex-col md:flex-row overflow-hidden hover:bg-accent/5 transition-colors">
                        <div className="w-full md:w-48 bg-muted h-32 md:h-auto shrink-0 flex items-center justify-center text-muted-foreground">
                            {service.subcategory}
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="font-bold text-lg">{service.title}</h3>
                                <p className="text-muted-foreground text-sm max-w-xl">{service.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-lg font-bold text-primary mb-2">Rp {service.price.toLocaleString('id-ID')}</p>
                                <Button size="sm">Pilih Paket</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
