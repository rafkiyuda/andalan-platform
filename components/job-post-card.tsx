'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Calendar } from 'lucide-react';
import { JobPost } from '@/lib/mock-jobs';
import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface JobPostCardProps {
    job: JobPost;
}

const urgencyColors = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const categoryColors = {
    tukang: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    it: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    rumah_tangga: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    otomotif: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    kecantikan: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

export function JobPostCard({ job }: JobPostCardProps) {
    const timeAgo = formatDistanceToNow(new Date(job.createdAt), {
        addSuffix: true,
        locale: localeId,
    });

    return (
        <Link href={`/marketplace/${job.id}`}>
            <Card className="card-hover cursor-pointer overflow-hidden border-primary/10 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge className={categoryColors[job.category as keyof typeof categoryColors] || 'bg-gray-100'}>
                                    {job.subcategory || job.category}
                                </Badge>
                                <Badge className={urgencyColors[job.urgency]}>
                                    {job.urgency === 'high' && 'Urgent'}
                                    {job.urgency === 'medium' && 'Normal'}
                                    {job.urgency === 'low' && 'Flexible'}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                            <Users className="h-4 w-4" />
                            <span className="text-sm font-medium">{job.applicationCount}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {job.description}
                    </p>

                    {/* Budget */}
                    <div className="mb-4">
                        <div className="text-sm text-muted-foreground mb-1">Budget</div>
                        <div className="text-xl font-bold text-primary">
                            Rp {job.budgetMin.toLocaleString('id-ID')} - Rp {job.budgetMax.toLocaleString('id-ID')}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                        </div>
                        {job.deadline && (
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>Deadline: {new Date(job.deadline).toLocaleDateString('id-ID')}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 ml-auto">
                            <Clock className="h-4 w-4" />
                            <span>{timeAgo}</span>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                        <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                            {job.userName.charAt(0)}
                        </div>
                        <div className="text-sm">
                            <div className="font-medium">{job.userName}</div>
                            <div className="text-muted-foreground">Pemberi Kerja</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
