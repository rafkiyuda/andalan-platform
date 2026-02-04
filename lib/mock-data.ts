import { Profile, Service } from '@/types';

export const CATEGORIES = [
    {
        id: 'tukang',
        title: 'Tukang & Teknisi',
        items: [
            { id: 'plumbing', name: 'Tukang Ledeng', icon: 'Wrench' },
            { id: 'electrical', name: 'Tukang Listrik', icon: 'Zap' },
            { id: 'ac', name: 'Teknisi AC', icon: 'Fan' },
            { id: 'construction', name: 'Tukang Bangunan', icon: 'HardHat' },
        ]
    },
    {
        id: 'it',
        title: 'IT & Digital',
        items: [
            { id: 'webdev', name: 'Web Development', icon: 'Code' },
            { id: 'design', name: 'Design', icon: 'Palette' },
            { id: 'laptop', name: 'Service Laptop', icon: 'Laptop' },
            { id: 'network', name: 'Networking', icon: 'Wifi' },
        ]
    },
    {
        id: 'rumah_tangga',
        title: 'Rumah Tangga',
        items: [
            { id: 'cleaning', name: 'Cleaning Service', icon: 'Sparkles' },
            { id: 'laundry', name: 'Laundry', icon: 'Shirt' },
            { id: 'babysitter', name: 'Baby Sitter', icon: 'Baby' },
            { id: 'cook', name: 'Juru Masak', icon: 'ChefHat' },
        ]
    },
    {
        id: 'otomotif',
        title: 'Otomotif',
        items: [
            { id: 'motorcycle', name: 'Service Motor', icon: 'Bike' },
            { id: 'car', name: 'Service Mobil', icon: 'Car' },
            { id: 'wash', name: 'Cuci Kendaraan', icon: 'Droplet' },
        ]
    },
    {
        id: 'kecantikan',
        title: 'Kecantikan & Kesehatan',
        items: [
            { id: 'makeup', name: 'Makeup Artist', icon: 'Sparkles' },
            { id: 'hair', name: 'Hair Stylist', icon: 'Scissors' },
            { id: 'massage', name: 'Pijat & Spa', icon: 'Heart' },
        ]
    }
];

export const MOCK_PROFILES: Profile[] = [
    {
        id: 'w1',
        role: 'worker',
        full_name: 'Budi Santoso',
        verified_status: 'verified',
        skills: ['Pipa Bocor', 'Instalasi Air'],
        hourly_rate: 150000,
        rating: 4.8,
        review_count: 156,
        avatar_url: '/dummy-providers/provider_avatar_1_1770141760696.png'
    },
    {
        id: 'w2',
        role: 'worker',
        full_name: 'Agus Prasetyo',
        verified_status: 'verified',
        skills: ['Instalasi Listrik', 'Panel Listrik'],
        hourly_rate: 200000,
        rating: 4.6,
        review_count: 203,
        avatar_url: '/dummy-providers/provider_avatar_2_1770141777983.png'
    },
    {
        id: 'w3',
        role: 'worker',
        full_name: 'Dewi Lestari',
        verified_status: 'verified',
        skills: ['Service AC', 'Cuci AC'],
        hourly_rate: 100000,
        rating: 4.9,
        review_count: 189,
        avatar_url: '/dummy-providers/provider_avatar_3_1770141793229.png'
    },
    {
        id: 'w4',
        role: 'worker',
        full_name: 'Eko Purnomo',
        verified_status: 'verified',
        skills: ['Renovasi', 'Pengecatan'],
        hourly_rate: 250000,
        rating: 4.7,
        review_count: 134,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eko'
    },
    {
        id: 'w5',
        role: 'worker',
        full_name: 'Rizki Firmansyah',
        verified_status: 'verified',
        skills: ['Website Development', 'Mobile App'],
        hourly_rate: 500000,
        rating: 4.9,
        review_count: 87,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rizki'
    },
    {
        id: 'w6',
        role: 'worker',
        full_name: 'Maya Putri',
        verified_status: 'verified',
        skills: ['UI/UX Design', 'Graphic Design'],
        hourly_rate: 300000,
        rating: 4.8,
        review_count: 92,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya'
    },
    {
        id: 'w7',
        role: 'worker',
        full_name: 'Andi Wijaya',
        verified_status: 'verified',
        skills: ['Service Laptop', 'Install Windows'],
        hourly_rate: 150000,
        rating: 4.6,
        review_count: 76,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi'
    },
    {
        id: 'w8',
        role: 'worker',
        full_name: 'Sri Wahyuni',
        verified_status: 'verified',
        skills: ['Cleaning Service', 'Laundry'],
        hourly_rate: 100000,
        rating: 4.9,
        review_count: 245,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sri'
    },
    {
        id: 'w9',
        role: 'worker',
        full_name: 'Joko Susanto',
        verified_status: 'verified',
        skills: ['Service Motor', 'Ganti Oli'],
        hourly_rate: 75000,
        rating: 4.7,
        review_count: 156,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joko'
    },
    {
        id: 'w10',
        role: 'worker',
        full_name: 'Lisa Anggraini',
        verified_status: 'verified',
        skills: ['Makeup Artist', 'Hair Styling'],
        hourly_rate: 300000,
        rating: 4.8,
        review_count: 98,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    }
];

export const MOCK_SERVICES: Service[] = [
    // TUKANG CATEGORY
    {
        id: 's1',
        worker_id: 'w1',
        title: 'Service Pipa Bocor & Instalasi Air',
        category: 'tukang',
        subcategory: 'Tukang Ledeng',
        description: 'Perbaikan pipa bocor, instalasi air bersih, dan saluran tersumbat. Garansi 3 bulan.',
        price: 150000,
    },
    {
        id: 's2',
        worker_id: 'w2',
        title: 'Instalasi Listrik Rumah & Panel',
        category: 'tukang',
        subcategory: 'Tukang Listrik',
        description: 'Instalasi listrik rumah, panel listrik, MCB, dan stop kontak. Bergaransi.',
        price: 200000,
    },
    {
        id: 's3',
        worker_id: 'w3',
        title: 'Service AC & Cuci AC',
        category: 'tukang',
        subcategory: 'Teknisi AC',
        description: 'Service AC, cuci AC, isi freon, dan pasang AC baru. Teknisi bersertifikat.',
        price: 100000,
    },
    {
        id: 's4',
        worker_id: 'w4',
        title: 'Renovasi Rumah & Pengecatan',
        category: 'tukang',
        subcategory: 'Tukang Bangunan',
        description: 'Jasa renovasi rumah, pengecatan, dan pasang keramik. Harga nego.',
        price: 250000,
    },

    // IT CATEGORY
    {
        id: 's5',
        worker_id: 'w5',
        title: 'Pembuatan Website & Mobile App',
        category: 'it',
        subcategory: 'Web Development',
        description: 'Jasa pembuatan website company profile, e-commerce, dan mobile app. SEO friendly.',
        price: 5000000,
    },
    {
        id: 's6',
        worker_id: 'w6',
        title: 'UI/UX Design & Branding',
        category: 'it',
        subcategory: 'Design',
        description: 'Desain UI/UX aplikasi dan website, logo design, dan branding lengkap.',
        price: 3000000,
    },
    {
        id: 's7',
        worker_id: 'w7',
        title: 'Service Laptop & Install Windows',
        category: 'it',
        subcategory: 'Service Laptop',
        description: 'Service laptop lemot, install Windows, upgrade RAM/SSD, dan data recovery.',
        price: 150000,
    },

    // RUMAH TANGGA CATEGORY
    {
        id: 's8',
        worker_id: 'w8',
        title: 'Cleaning Service Rumah',
        category: 'rumah_tangga',
        subcategory: 'Cleaning Service',
        description: 'Jasa bersih-bersih rumah lengkap, termasuk kamar mandi dan dapur. Tim profesional.',
        price: 200000,
    },

    // OTOMOTIF CATEGORY
    {
        id: 's9',
        worker_id: 'w9',
        title: 'Service Motor Panggilan',
        category: 'otomotif',
        subcategory: 'Service Motor',
        description: 'Service motor panggilan ke rumah. Ganti oli, tune up, dan perbaikan ringan.',
        price: 75000,
    },

    // KECANTIKAN CATEGORY
    {
        id: 's10',
        worker_id: 'w10',
        title: 'Makeup Artist Wedding',
        category: 'kecantikan',
        subcategory: 'Makeup Artist',
        description: 'Jasa makeup artist untuk wedding, prewedding, dan event. Berpengalaman dan profesional.',
        price: 1500000,
    },
];
