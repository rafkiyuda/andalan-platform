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
    {
        id: '1',
        name: 'Budi Santoso',
        avatar: '/dummy-providers/provider_avatar_1_1770141760696.png',
        rating: 4.8,
        totalJobs: 156,
        location: 'Jakarta Pusat',
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
        id: '2',
        name: 'Agus Prasetyo',
        avatar: '/dummy-providers/provider_avatar_2_1770141777983.png',
        rating: 4.6,
        totalJobs: 203,
        location: 'Jakarta Selatan',
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
        id: '3',
        name: 'Dewi Lestari',
        avatar: '/dummy-providers/provider_avatar_3_1770141793229.png',
        rating: 4.9,
        totalJobs: 189,
        location: 'Jakarta Barat',
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
];

export function getProviderById(id: string): Provider | undefined {
    return mockProviders.find(p => p.id === id);
}

export function getProvidersByService(service: string): Provider[] {
    return mockProviders.filter(p =>
        p.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
    );
}
