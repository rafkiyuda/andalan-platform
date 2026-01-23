export type UserRole = 'user' | 'worker';

export type VerificationStatus = 'unverified' | 'pending' | 'verified';

export type ServiceCategory = 'formal' | 'informal';

export interface Profile {
    id: string;
    role: UserRole;
    full_name: string;
    avatar_url?: string;
    verified_status: VerificationStatus;
    skills: string[];
    hourly_rate?: number;
    bio?: string;
    rating: number;
    review_count: number;
}

export interface Service {
    id: string;
    worker_id: string;
    title: string;
    category: ServiceCategory;
    subcategory: string; // e.g., 'AC Repair', 'Legal Consultant'
    description: string;
    price: number;
    image_url?: string;
}

export interface Booking {
    id: string;
    user_id: string;
    worker_id: string;
    service_id: string;
    status: 'pending' | 'accepted' | 'completed' | 'cancelled';
    grouping_id?: string; // For Andalan Padu
    created_at: string;
    scheduled_for: string;
}
