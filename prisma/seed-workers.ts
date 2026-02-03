import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with workers/mitra...');

    // Clear existing workers
    await prisma.worker.deleteMany();

    // Seed Workers/Mitra
    const workers = [
        // AC & Electronics Specialists
        {
            name: 'Budi Santoso',
            phone: '081234567890',
            email: 'budi.ac@example.com',
            location: 'Jakarta Selatan',
            skills: ['Perbaikan AC', 'Service AC', 'Instalasi AC', 'Cleaning AC'],
            category: 'formal',
            specialization: 'Teknisi AC Profesional',
            experience: 8,
            rating: 4.8,
            totalJobs: 234,
            isAvailable: true,
            isVerified: true,
            priceRange: '100000-250000',
            workingHours: '08:00-18:00',
            description: 'Spesialis perbaikan AC semua merk. Berpengalaman 8 tahun menangani AC rumah dan kantor. Garansi service 30 hari.',
            certifications: ['Sertifikat Teknisi AC', 'Sertifikat K3'],
        },
        {
            name: 'Ahmad Rifai',
            phone: '081234567891',
            email: 'ahmad.elektronik@example.com',
            location: 'Jakarta Pusat',
            skills: ['Perbaikan Kulkas', 'Service Kulkas', 'Perbaikan Mesin Cuci', 'Perbaikan Elektronik'],
            category: 'formal',
            specialization: 'Teknisi Elektronik Rumah Tangga',
            experience: 10,
            rating: 4.9,
            totalJobs: 456,
            isAvailable: true,
            isVerified: true,
            priceRange: '80000-200000',
            workingHours: '08:00-17:00',
            description: 'Ahli perbaikan kulkas, mesin cuci, dan elektronik rumah tangga. Pengalaman 10 tahun, tersedia spare part original.',
            certifications: ['Sertifikat Teknisi Elektronik', 'Sertifikat K3'],
        },

        // Plumbing & Home Repair
        {
            name: 'Joko Widodo',
            phone: '081234567892',
            email: 'joko.plumbing@example.com',
            location: 'Jakarta Barat',
            skills: ['Perbaikan Pipa', 'Instalasi Pipa', 'Perbaikan Kran', 'Perbaikan Toilet', 'Sedot WC'],
            category: 'informal',
            specialization: 'Tukang Ledeng Profesional',
            experience: 12,
            rating: 4.7,
            totalJobs: 567,
            isAvailable: true,
            isVerified: true,
            priceRange: '50000-150000',
            workingHours: '07:00-19:00',
            description: 'Tukang ledeng berpengalaman. Tangani pipa bocor, instalasi, kran, toilet, dan sedot WC. Siap 24 jam untuk emergency.',
            certifications: ['Sertifikat Tukang Ledeng'],
        },
        {
            name: 'Hendra Saputra',
            phone: '081234567893',
            location: 'Tangerang',
            skills: ['Perbaikan Atap', 'Perbaikan Tembok', 'Pengecatan', 'Renovasi Rumah'],
            category: 'informal',
            specialization: 'Tukang Bangunan',
            experience: 15,
            rating: 4.6,
            totalJobs: 389,
            isAvailable: true,
            isVerified: true,
            priceRange: '75000-200000',
            workingHours: '07:00-17:00',
            description: 'Tukang bangunan profesional. Ahli renovasi rumah, perbaikan atap bocor, pengecatan, dan perbaikan tembok.',
            certifications: ['Sertifikat Tukang Bangunan'],
        },

        // Cleaning Services
        {
            name: 'Siti Nurhaliza',
            phone: '081234567894',
            email: 'siti.cleaning@example.com',
            location: 'Jakarta Selatan',
            skills: ['Pembersihan Rumah', 'Deep Cleaning', 'Cuci Sofa', 'Cuci Karpet', 'Cuci AC'],
            category: 'formal',
            specialization: 'Professional Cleaning Service',
            experience: 5,
            rating: 4.8,
            totalJobs: 678,
            isAvailable: true,
            isVerified: true,
            priceRange: '100000-300000',
            workingHours: '08:00-16:00',
            description: 'Jasa pembersihan profesional. Deep cleaning, cuci sofa, karpet, dan AC. Gunakan produk eco-friendly.',
            certifications: ['Sertifikat Cleaning Service'],
        },

        // Automotive
        {
            name: 'Bambang Kurniawan',
            phone: '081234567895',
            email: 'bambang.montir@example.com',
            location: 'Bekasi',
            skills: ['Service Motor', 'Ganti Oli', 'Tune Up', 'Perbaikan Motor', 'Cuci Motor'],
            category: 'informal',
            specialization: 'Montir Motor',
            experience: 7,
            rating: 4.5,
            totalJobs: 234,
            isAvailable: true,
            isVerified: true,
            priceRange: '50000-150000',
            workingHours: '08:00-20:00',
            description: 'Montir motor berpengalaman. Service rutin, tune up, ganti oli, dan perbaikan motor. Bisa datang ke rumah.',
            certifications: [],
        },

        // Computer & IT
        {
            name: 'Deni Pratama',
            phone: '081234567896',
            email: 'deni.it@example.com',
            location: 'Jakarta Pusat',
            skills: ['Perbaikan Komputer', 'Perbaikan Laptop', 'Instalasi Software', 'Recovery Data', 'Setup Jaringan'],
            category: 'formal',
            specialization: 'IT Support & Computer Repair',
            experience: 6,
            rating: 4.9,
            totalJobs: 345,
            isAvailable: true,
            isVerified: true,
            priceRange: '100000-250000',
            workingHours: '09:00-18:00',
            description: 'Teknisi IT profesional. Perbaikan komputer, laptop, instalasi software, recovery data, dan setup jaringan.',
            certifications: ['CompTIA A+', 'Network+'],
        },

        // Education
        {
            name: 'Rina Wulandari',
            phone: '081234567897',
            email: 'rina.guru@example.com',
            location: 'Jakarta Selatan',
            skills: ['Les Matematika', 'Les Fisika', 'Les Kimia', 'Bimbingan Belajar'],
            category: 'formal',
            specialization: 'Guru Les Privat MIPA',
            experience: 8,
            rating: 4.9,
            totalJobs: 567,
            isAvailable: true,
            isVerified: true,
            pricePerHour: 150000,
            workingHours: '14:00-20:00',
            description: 'Guru les privat matematika, fisika, dan kimia SD-SMA. Lulusan S1 Pendidikan, pengalaman 8 tahun.',
            certifications: ['S1 Pendidikan Matematika'],
        },
        {
            name: 'Farhan Hidayat',
            phone: '081234567898',
            email: 'farhan.english@example.com',
            location: 'Jakarta Pusat',
            skills: ['Les Bahasa Inggris', 'TOEFL Preparation', 'IELTS Preparation', 'English Conversation'],
            category: 'formal',
            specialization: 'English Tutor',
            experience: 5,
            rating: 4.8,
            totalJobs: 234,
            isAvailable: true,
            isVerified: true,
            pricePerHour: 175000,
            workingHours: '15:00-21:00',
            description: 'Native-level English tutor. Spesialis TOEFL/IELTS preparation dan conversation. TOEFL score 650.',
            certifications: ['TOEFL Certificate', 'TESOL Certificate'],
        },

        // Garden & Outdoor
        {
            name: 'Agus Supriyanto',
            phone: '081234567899',
            location: 'Depok',
            skills: ['Tukang Taman', 'Perawatan Taman', 'Potong Rumput', 'Pangkas Pohon'],
            category: 'informal',
            specialization: 'Tukang Taman',
            experience: 10,
            rating: 4.6,
            totalJobs: 456,
            isAvailable: true,
            isVerified: true,
            priceRange: '75000-200000',
            workingHours: '07:00-16:00',
            description: 'Tukang taman profesional. Perawatan taman, potong rumput, pangkas pohon, dan desain taman minimalis.',
            certifications: [],
        },
    ];

    for (const worker of workers) {
        await prisma.worker.create({ data: worker });
        console.log(`✅ Created worker: ${worker.name} (${worker.specialization})`);
    }

    console.log('✨ Seeding completed!');
    console.log(`📊 Total workers created: ${workers.length}`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
