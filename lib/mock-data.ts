import { Profile, Service } from '@/types';

export const CATEGORIES = [
    {
        id: 'formal',
        title: 'Formal Services',
        items: [
            { id: 'prog', name: 'Programming', icon: 'Code' },
            { id: 'design', name: 'Design', icon: 'Palette' },
            { id: 'legal', name: 'Legal', icon: 'Scale' },
            { id: 'tutor', name: 'Tutor', icon: 'GraduationCap' },
        ]
    },
    {
        id: 'informal',
        title: 'Informal Services',
        items: [
            { id: 'ac', name: 'AC Repair', icon: 'Fan' },
            { id: 'plumbing', name: 'Plumbing', icon: 'Wrench' },
            { id: 'cleaning', name: 'Cleaning', icon: 'Sparkles' },
            { id: 'massage', name: 'Massage', icon: 'Activity' },
        ]
    }
];

export const MOCK_PROFILES: Profile[] = [
    {
        id: 'w1',
        role: 'worker',
        full_name: 'Budi Santoso',
        verified_status: 'verified',
        skills: ['AC Repair', 'Electrician'],
        hourly_rate: 75000,
        rating: 4.8,
        review_count: 124,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi'
    },
    {
        id: 'w2',
        role: 'worker',
        full_name: 'Siti Aminah',
        verified_status: 'verified',
        skills: ['UI/UX Design', 'Figma'],
        hourly_rate: 150000,
        rating: 4.9,
        review_count: 45,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti'
    }
];

export const MOCK_SERVICES: Service[] = [
    {
        id: 's1',
        worker_id: 'w1',
        title: 'Cuci AC Split - Standard',
        category: 'informal',
        subcategory: 'AC Repair',
        description: 'Pembersihan AC split ukuran 0.5 - 2 PK. Termasuk cek freon.',
        price: 75000,
    },
    {
        id: 's2',
        worker_id: 'w2',
        title: 'Landing Page Design',
        category: 'formal',
        subcategory: 'Design',
        description: 'Modern landing page UI design in Figma. Mobile responsive.',
        price: 1500000,
    }
];
