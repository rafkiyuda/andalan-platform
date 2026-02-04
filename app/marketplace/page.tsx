'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { JobPostCard } from '@/components/job-post-card';
import { mockJobPosts } from '@/lib/mock-jobs';
import { Search, Plus, Filter, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedUrgency, setSelectedUrgency] = useState<string>('all');
    const [selectedBudget, setSelectedBudget] = useState<string>('all');

    // Filter jobs based on selections
    const filteredJobs = useMemo(() => {
        let jobs = mockJobPosts.filter(job => job.status === 'open');

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            jobs = jobs.filter(job =>
                job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.location.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            jobs = jobs.filter(job => job.category === selectedCategory);
        }

        // Urgency filter
        if (selectedUrgency !== 'all') {
            jobs = jobs.filter(job => job.urgency === selectedUrgency);
        }

        // Budget filter
        if (selectedBudget !== 'all') {
            if (selectedBudget === 'low') {
                jobs = jobs.filter(job => job.budgetMax < 500000);
            } else if (selectedBudget === 'medium') {
                jobs = jobs.filter(job => job.budgetMax >= 500000 && job.budgetMax < 2000000);
            } else if (selectedBudget === 'high') {
                jobs = jobs.filter(job => job.budgetMax >= 2000000);
            }
        }

        return jobs;
    }, [searchQuery, selectedCategory, selectedUrgency, selectedBudget]);

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-8">
            {/* Header */}
            <div className="bg-gradient-soft border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
                                <Briefcase className="h-7 w-7 text-primary" />
                                Marketplace
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Temukan pekerjaan atau posting kebutuhan jasa Anda
                            </p>
                        </div>
                        <Link href="/marketplace/post">
                            <Button className="rounded-xl bg-gradient-primary text-white shadow-lg hover:opacity-90">
                                <Plus className="h-4 w-4 mr-2" />
                                Post Pekerjaan
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Filters Section */}
                <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-8 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="h-5 w-5 text-muted-foreground" />
                        <h2 className="font-semibold text-lg">Filter Pekerjaan</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari pekerjaan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Semua Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="tukang">Tukang & Teknisi</SelectItem>
                                <SelectItem value="it">IT & Digital</SelectItem>
                                <SelectItem value="rumah_tangga">Rumah Tangga</SelectItem>
                                <SelectItem value="otomotif">Otomotif</SelectItem>
                                <SelectItem value="kecantikan">Kecantikan</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Urgency Filter */}
                        <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Semua Urgensi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Urgensi</SelectItem>
                                <SelectItem value="high">Urgent</SelectItem>
                                <SelectItem value="medium">Normal</SelectItem>
                                <SelectItem value="low">Flexible</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Budget Filter */}
                        <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                            <SelectTrigger className="rounded-xl max-w-xs">
                                <SelectValue placeholder="Semua Budget" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Budget</SelectItem>
                                <SelectItem value="low">&lt; Rp 500.000</SelectItem>
                                <SelectItem value="medium">Rp 500.000 - 2 Juta</SelectItem>
                                <SelectItem value="high">&gt; Rp 2 Juta</SelectItem>
                            </SelectContent>
                        </Select>

                        {(searchQuery || selectedCategory !== 'all' || selectedUrgency !== 'all' || selectedBudget !== 'all') && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                    setSelectedUrgency('all');
                                    setSelectedBudget('all');
                                }}
                                className="rounded-xl"
                            >
                                Reset Filter
                            </Button>
                        )}
                    </div>
                </div>

                {/* Results Header */}
                <div className="mb-6">
                    <p className="text-muted-foreground">
                        Menampilkan <span className="font-semibold text-foreground">{filteredJobs.length}</span> pekerjaan
                    </p>
                </div>

                {/* Job Listings */}
                {filteredJobs.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredJobs.map((job) => (
                            <JobPostCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Tidak Ada Pekerjaan Ditemukan</h3>
                        <p className="text-muted-foreground mb-6">
                            Coba ubah filter atau kata kunci pencarian Anda
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                                setSelectedUrgency('all');
                                setSelectedBudget('all');
                            }}
                            className="rounded-xl"
                        >
                            Reset Filter
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
