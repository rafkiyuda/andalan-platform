// Mock provider data for development
export interface Provider {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalJobs: number;
    location: string;
    services: string[];
    bio: string;
    verified: boolean;
    phone: string;
    priceRange: {
        min: number;
        max: number;
    };
    availability: string;
    reviews: Review[];
    category: string;
}

export interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
    service: string;
}

export const mockProviders: Provider[] = [
    // TUKANG CATEGORY
    {
        id: 'w1',
        name: 'Budi Santoso',
        avatar: '/dummy-providers/provider_avatar_1_1770141760696.png',
        rating: 4.8,
        totalJobs: 156,
        location: 'Jakarta Pusat',
        category: 'tukang',
        services: ['Pipa Bocor', 'Instalasi Air', 'Saluran Tersumbat', 'Water Heater'],
        bio: 'Tukang ledeng profesional dengan pengalaman 10+ tahun. Melayani area Jakarta dan sekitarnya. Siap dipanggil untuk situasi darurat 24/7.',
        verified: true,
        phone: '+6281234567890',
        priceRange: {
            min: 150000,
            max: 500000,
        },
        availability: 'Tersedia hari ini',
        reviews: [
            {
                id: '1',
                userName: 'Ani Wulandari',
                rating: 5,
                comment: 'Sangat cepat dan profesional! Pipa bocor di dapur langsung diperbaiki. Harga juga reasonable.',
                date: '2024-01-15',
                service: 'Pipa Bocor',
            },
            {
                id: '2',
                userName: 'Joko Widodo',
                rating: 4.5,
                comment: 'Kerjanya rapi dan bersih. Datang tepat waktu sesuai janji.',
                date: '2024-01-10',
                service: 'Instalasi Air',
            },
            {
                id: '3',
                userName: 'Siti Nurhaliza',
                rating: 5,
                comment: 'Recommended! Water heater yang mati 2 minggu langsung jalan lagi.',
                date: '2024-01-05',
                service: 'Water Heater',
            },
        ],
    },
    {
        id: 'w2',
        name: 'Agus Prasetyo',
        avatar: '/dummy-providers/provider_avatar_2_1770141777983.png',
        rating: 4.6,
        totalJobs: 203,
        location: 'Jakarta Selatan',
        category: 'tukang',
        services: ['Instalasi Listrik', 'Panel Listrik', 'Lampu', 'Stop Kontak', 'MCB'],
        bio: 'Teknisi listrik bersertifikat dengan 12 tahun pengalaman. Mengutamakan keselamatan dan kualitas pekerjaan.',
        verified: true,
        phone: '+6281234567891',
        priceRange: {
            min: 200000,
            max: 800000,
        },
        availability: 'Tersedia besok',
        reviews: [
            {
                id: '1',
                userName: 'Dedi Kusuma',
                rating: 5,
                comment: 'Instalasi panel listrik rumah baru sangat rapi. Dijelaskan detail cara perawatannya.',
                date: '2024-01-20',
                service: 'Panel Listrik',
            },
            {
                id: '2',
                userName: 'Rina Marlina',
                rating: 4,
                comment: 'Pekerjaan bagus, hanya saja agak lama karena ada kendala material.',
                date: '2024-01-12',
                service: 'Instalasi Listrik',
            },
        ],
    },
    {
        id: 'w3',
        name: 'Dewi Lestari',
        avatar: '/dummy-providers/provider_avatar_3_1770141793229.png',
        rating: 4.9,
        totalJobs: 189,
        location: 'Jakarta Barat',
        category: 'tukang',
        services: ['Service AC', 'Cuci AC', 'Isi Freon', 'Pasang AC Baru', 'Bongkar Pasang AC'],
        bio: 'Teknisi AC wanita pertama di Jakarta dengan sertifikasi internasional. Spesialis AC rumah dan kantor.',
        verified: true,
        phone: '+6281234567892',
        priceRange: {
            min: 100000,
            max: 600000,
        },
        availability: 'Tersedia hari ini',
        reviews: [
            {
                id: '1',
                userName: 'Hendra Gunawan',
                rating: 5,
                comment: 'AC yang sudah 3 bulan tidak dingin jadi dingin lagi! Servicenya detail banget.',
                date: '2024-01-22',
                service: 'Service AC',
            },
            {
                id: '2',
                userName: 'Linda Wijaya',
                rating: 5,
                comment: 'Senang ada teknisi AC wanita. Lebih nyaman dan profesional.',
                date: '2024-01-18',
                service: 'Cuci AC',
            },
            {
                id: '3',
                userName: 'Bambang Sutrisno',
                rating: 4.8,
                comment: 'Pasang AC baru di 2 kamar, hasilnya bagus dan rapi.',
                date: '2024-01-08',
                service: 'Pasang AC Baru',
            },
        ],
    },
    {
        id: 'w4',
        name: 'Eko Purnomo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eko',
        rating: 4.7,
        totalJobs: 134,
        location: 'Jakarta Timur',
        category: 'tukang',
        services: ['Tukang Bangunan', 'Renovasi', 'Pengecatan', 'Pasang Keramik'],
        bio: 'Mandor bangunan berpengalaman 15 tahun. Ahli dalam renovasi rumah dan pasang keramik.',
        verified: true,
        phone: '+6281234567893',
        priceRange: {
            min: 250000,
            max: 1000000,
        },
        availability: 'Tersedia minggu depan',
        reviews: [
            {
                id: '1',
                userName: 'Sari Dewi',
                rating: 4.7,
                comment: 'Renovasi dapur sangat rapi. Pasang keramik bagus dan kuat.',
                date: '2024-01-18',
                service: 'Renovasi',
            },
        ],
    },

    // IT CATEGORY
    {
        id: 'w5',
        name: 'Rizki Firmansyah',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rizki',
        rating: 4.9,
        totalJobs: 87,
        location: 'Jakarta Selatan',
        category: 'it',
        services: ['Website Development', 'Mobile App', 'SEO', 'Bug Fixing'],
        bio: 'Full-stack developer dengan 8 tahun pengalaman. Spesialis React, Next.js, dan mobile development.',
        verified: true,
        phone: '+6281234567894',
        priceRange: {
            min: 500000,
            max: 5000000,
        },
        availability: 'Tersedia minggu depan',
        reviews: [
            {
                id: '1',
                userName: 'PT ABC Indonesia',
                rating: 5,
                comment: 'Website company profile sangat profesional. Delivery tepat waktu!',
                date: '2024-01-25',
                service: 'Website Development',
            },
        ],
    },
    {
        id: 'w6',
        name: 'Maya Putri',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        rating: 4.8,
        totalJobs: 92,
        location: 'Jakarta Pusat',
        category: 'it',
        services: ['UI/UX Design', 'Graphic Design', 'Logo Design', 'Branding'],
        bio: 'UI/UX Designer profesional. Lulusan DKV ITB dengan portfolio internasional.',
        verified: true,
        phone: '+6281234567895',
        priceRange: {
            min: 300000,
            max: 3000000,
        },
        availability: 'Tersedia hari ini',
        reviews: [
            {
                id: '1',
                userName: 'Startup XYZ',
                rating: 4.8,
                comment: 'Design aplikasi kami sangat modern dan user-friendly. Highly recommended!',
                date: '2024-01-23',
                service: 'UI/UX Design',
            },
        ],
    },
    {
        id: 'w7',
        name: 'Andi Wijaya',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi',
        rating: 4.6,
        totalJobs: 76,
        location: 'Jakarta Barat',
        category: 'it',
        services: ['Service Laptop', 'Install Windows', 'Upgrade RAM', 'Data Recovery'],
        bio: 'Teknisi komputer dan laptop dengan 10 tahun pengalaman. Garansi satisfaction 100%.',
        verified: true,
        phone: '+6281234567896',
        priceRange: {
            min: 150000,
            max: 1000000,
        },
        availability: 'Tersedia hari ini',
        reviews: [
            {
                id: '1',
                userName: 'Budi Hartono',
                rating: 4.5,
                comment: 'Laptop lemot jadi kencang lagi setelah di-service. Mantap!',
                date: '2024-01-21',
                service: 'Service Laptop',
            },
        ],
    },

    // JASA LAINNYA
    {
        id: 'w8',
        name: 'Sri Wahyuni',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sri',
        rating: 4.9,
        totalJobs: 245,
        location: 'Jakarta Selatan',
        category: 'rumah_tangga',
        services: ['Cleaning Service', 'Laundry', 'Setrika', 'Baby Sitter'],
        bio: 'Penyedia jasa kebersihan rumah profesional. Tim berpengalaman dan terpercaya.',
        verified: true,
        phone: '+6281234567897',
        priceRange: {
            min: 100000,
            max: 500000,
        },
        availability: 'Tersedia hari ini',
        reviews: [
            {
                id: '1',
                userName: 'Keluarga Wijaya',
                rating: 5,
                comment: 'Cleaning service sangat bersih dan teliti. Akan pakai lagi!',
                date: '2024-01-24',
                service: 'Cleaning Service',
            },
        ],
    },
    {
        id: 'w9',
        name: 'Joko Susanto',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joko',
        rating: 4.7,
        totalJobs: 156,
        location: 'Jakarta Timur',
        category: 'otomotif',
        services: ['Service Motor', 'Ganti Oli', 'Tune Up', 'Ganti Ban'],
        bio: 'Mekanik motor berpengalaman 12 tahun. Service panggilan ke rumah.',
        verified: true,
        phone: '+6281234567898',
        priceRange: {
            min: 75000,
            max: 500000,
        },
        availability: 'Tersedia besok',
        reviews: [
            {
                id: '1',
                userName: 'Rudi Hermawan',
                rating: 4.7,
                comment: 'Service motor di rumah, praktis! Mekaniknya juga jujur.',
                date: '2024-01-19',
                service: 'Service Motor',
            },
        ],
    },
    {
        id: 'w10',
        name: 'Lisa Anggraini',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        rating: 4.8,
        totalJobs: 98,
        location: 'Jakarta Pusat',
        category: 'kecantikan',
        services: ['Makeup Artist', 'Hair Styling', 'Nail Art', 'Facial Treatment'],
        bio: 'Makeup artist profesional untuk wedding, prewedding, dan event. Portfolio lengkap tersedia.',
        verified: true,
        phone: '+6281234567899',
        priceRange: {
            min: 300000,
            max: 2000000,
        },
        availability: 'Booking 2 minggu ke depan',
        reviews: [
            {
                id: '1',
                userName: 'Pengantin Happy',
                rating: 5,
                comment: 'Makeup wedding saya cantik banget! Semua tamu bilang bagus. Thanks!',
                date: '2024-01-20',
                service: 'Makeup Artist',
            },
        ],
    },
];

export function getProviderById(id: string): Provider | undefined {
    return mockProviders.find(p => p.id === id);
}

export function getProvidersByService(service: string): Provider[] {
    return mockProviders.filter(p =>
        p.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
    );
}

export function getProvidersByCategory(category: string): Provider[] {
    return mockProviders.filter(p => p.category === category);
}
