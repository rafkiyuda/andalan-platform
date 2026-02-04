// Mock job posting data for marketplace feature
export interface JobPost {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    title: string;
    description: string;
    category: string;
    subcategory?: string;
    budgetMin: number;
    budgetMax: number;
    location: string;
    urgency: 'low' | 'medium' | 'high';
    deadline?: string;
    images: string[];
    status: 'open' | 'in_progress' | 'completed' | 'cancelled';
    applicationCount: number;
    createdAt: string;
}

export const mockJobPosts: JobPost[] = [
    // TUKANG CATEGORY
    {
        id: 'j1',
        userId: 'u1',
        userName: 'Andi Wijaya',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi1',
        title: 'Butuh Teknisi AC untuk Service 3 Unit',
        description: 'Saya membutuhkan teknisi AC yang berpengalaman untuk service rutin 3 unit AC di rumah. AC sudah 6 bulan tidak pernah dibersihkan dan ada yang kurang dingin. Lokasi di Jakarta Selatan, perumahan dekat Pondok Indah.',
        category: 'tukang',
        subcategory: 'Teknisi AC',
        budgetMin: 300000,
        budgetMax: 500000,
        location: 'Jakarta Selatan',
        urgency: 'medium',
        deadline: '2024-02-10',
        images: [],
        status: 'open',
        applicationCount: 5,
        createdAt: '2024-02-01T10:00:00Z',
    },
    {
        id: 'j2',
        userId: 'u2',
        userName: 'Siti Aminah',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti1',
        title: 'Urgent! Pipa Bocor di Kamar Mandi',
        description: 'Pipa air di kamar mandi bocor parah, air merembes ke tembok. Butuh tukang ledeng yang bisa datang hari ini atau besok pagi. Siap bayar lebih untuk service cepat.',
        category: 'tukang',
        subcategory: 'Tukang Ledeng',
        budgetMin: 200000,
        budgetMax: 400000,
        location: 'Jakarta Pusat',
        urgency: 'high',
        deadline: '2024-02-05',
        images: [],
        status: 'open',
        applicationCount: 8,
        createdAt: '2024-02-03T14:30:00Z',
    },
    {
        id: 'j3',
        userId: 'u3',
        userName: 'Budi Santoso',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi2',
        title: 'Instalasi Listrik Rumah Baru',
        description: 'Rumah baru 2 lantai butuh instalasi listrik lengkap. Total 15 titik lampu, 20 stop kontak, dan 1 panel listrik. Pekerjaan estimasi 3-4 hari. Lokasi Tangerang.',
        category: 'tukang',
        subcategory: 'Tukang Listrik',
        budgetMin: 2000000,
        budgetMax: 3500000,
        location: 'Tangerang',
        urgency: 'low',
        deadline: '2024-02-20',
        images: [],
        status: 'open',
        applicationCount: 3,
        createdAt: '2024-01-28T09:15:00Z',
    },
    {
        id: 'j4',
        userId: 'u4',
        userName: 'Dewi Lestari',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi1',
        title: 'Renovasi & Cat Ulang Rumah',
        description: 'Mau renovasi rumah tipe 36. Perlu cat ulang semua ruangan (4 kamar), perbaikan plafon yang rusak, dan pasang keramik kamar mandi. Bebas pilih warna cat.',
        category: 'tukang',
        subcategory: 'Tukang Bangunan',
        budgetMin: 5000000,
        budgetMax: 8000000,
        location: 'Jakarta Timur',
        urgency: 'medium',
        deadline: '2024-03-01',
        images: [],
        status: 'open',
        applicationCount: 6,
        createdAt: '2024-01-30T11:00:00Z',
    },

    // IT CATEGORY
    {
        id: 'j5',
        userId: 'u5',
        userName: 'Raka Pratama',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raka',
        title: 'Buat Website Company Profile UMKM',
        description: 'Saya punya bisnis UMKM dan butuh website company profile yang simple tapi profesional. Perlu 5-6 halaman, form contact, dan responsive mobile. Domainnya sudah ada.',
        category: 'it',
        subcategory: 'Web Development',
        budgetMin: 3000000,
        budgetMax: 5000000,
        location: 'Remote',
        urgency: 'low',
        deadline: '2024-02-28',
        images: [],
        status: 'open',
        applicationCount: 12,
        createdAt: '2024-01-25T08:00:00Z',
    },
    {
        id: 'j6',
        userId: 'u6',
        userName: 'Maya Putri',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya1',
        title: 'Design Logo & Branding Startup',
        description: 'Startup baru di bidang F&B, butuh design logo modern dan minimalis + brand guideline. Prefer warna earth tone. Tolong sertakan portfolio sebelumnya ya!',
        category: 'it',
        subcategory: 'Design',
        budgetMin: 1500000,
        budgetMax: 3000000,
        location: 'Remote',
        urgency: 'medium',
        deadline: '2024-02-15',
        images: [],
        status: 'open',
        applicationCount: 15,
        createdAt: '2024-02-02T13:20:00Z',
    },
    {
        id: 'j7',
        userId: 'u7',
        userName: 'Eko Purnomo',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eko1',
        title: 'Service Laptop Lemot & Install Ulang',
        description: 'Laptop kerja sudah sangat lemot, sering hang. Mau di-service, bersihkan dari virus, install ulang Windows 11 ori, dan backup data penting. Laptop Lenovo Thinkpad.',
        category: 'it',
        subcategory: 'Service Laptop',
        budgetMin: 200000,
        budgetMax: 400000,
        location: 'Jakarta Barat',
        urgency: 'high',
        deadline: '2024-02-07',
        images: [],
        status: 'open',
        applicationCount: 7,
        createdAt: '2024-02-04T07:00:00Z',
    },

    // RUMAH TANGGA CATEGORY
    {
        id: 'j8',
        userId: 'u8',
        userName: 'Linda Wijaya',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda',
        title: 'Cleaning Service Rumah 2 Lantai',
        description: 'Butuh cleaning service untuk bersih-bersih rumah 2 lantai (4 kamar tidur, 3 kamar mandi). Rumah belum dihuni 2 bulan jadi banyak debu. Perlu 2-3 orang cleaning.',
        category: 'rumah_tangga',
        subcategory: 'Cleaning Service',
        budgetMin: 400000,
        budgetMax: 600000,
        location: 'Jakarta Selatan',
        urgency: 'medium',
        deadline: '2024-02-12',
        images: [],
        status: 'open',
        applicationCount: 4,
        createdAt: '2024-02-01T16:45:00Z',
    },

    // OTOMOTIF CATEGORY
    {
        id: 'j9',
        userId: 'u9',
        userName: 'Agus Hermawan',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Agus2',
        title: 'Service Motor Honda Beat di Rumah',
        description: 'Motor Honda Beat 2019 mau di-service rutin. Ganti oli, cek rem, rantai, dan tune up. Prefer yang bisa datang ke rumah karena saya sibuk kerja.',
        category: 'otomotif',
        subcategory: 'Service Motor',
        budgetMin: 150000,
        budgetMax: 250000,
        location: 'Jakarta Timur',
        urgency: 'low',
        deadline: '2024-02-18',
        images: [],
        status: 'open',
        applicationCount: 9,
        createdAt: '2024-01-31T12:00:00Z',
    },

    // KECANTIKAN CATEGORY
    {
        id: 'j10',
        userId: 'u10',
        userName: 'Rina Marlina',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rina',
        title: 'Makeup Artist untuk Wedding',
        description: 'Cari MUA profesional untuk wedding tanggal 15 Maret 2024. Lokasi di Balai Sudirman Jakarta. Untuk pengantin + 4 bridesmaid. Prefer yang ada portfolio wedding sebelumnya.',
        category: 'kecantikan',
        subcategory: 'Makeup Artist',
        budgetMin: 5000000,
        budgetMax: 8000000,
        location: 'Jakarta Pusat',
        urgency: 'high',
        deadline: '2024-02-10',
        images: [],
        status: 'open',
        applicationCount: 11,
        createdAt: '2024-01-29T15:30:00Z',
    },
];

export function getJobPostById(id: string): JobPost | undefined {
    return mockJobPosts.find(job => job.id === id);
}

export function getJobPostsByCategory(category: string): JobPost[] {
    return mockJobPosts.filter(job => job.category === category && job.status === 'open');
}

export function getJobPostsByUrgency(urgency: string): JobPost[] {
    return mockJobPosts.filter(job => job.urgency === urgency && job.status === 'open');
}

export function getOpenJobPosts(): JobPost[] {
    return mockJobPosts.filter(job => job.status === 'open');
}
