import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create sample user
    const user = await prisma.user.upsert({
        where: { id: 'user_demo_001' },
        update: {},
        create: {
            id: 'user_demo_001',
            name: 'Demo User',
            email: 'demo@andalan.com',
            phone: '+62812345678',
        },
    });

    console.log('✅ Created user:', user.name);

    // Create sample services
    const services = await Promise.all([
        prisma.service.upsert({
            where: { id: 'service_ac_001' },
            update: {},
            create: {
                id: 'service_ac_001',
                name: 'Perbaikan AC',
                category: 'informal',
                description: 'Service dan perbaikan AC rumah dan kantor',
                basePrice: 150000,
                icon: 'Wind',
            },
        }),
        prisma.service.upsert({
            where: { id: 'service_cleaning_001' },
            update: {},
            create: {
                id: 'service_cleaning_001',
                name: 'Cleaning Service',
                category: 'informal',
                description: 'Pembersihan rumah dan kantor profesional',
                basePrice: 200000,
                icon: 'Sparkles',
            },
        }),
        prisma.service.upsert({
            where: { id: 'service_plumber_001' },
            update: {},
            create: {
                id: 'service_plumber_001',
                name: 'Tukang Ledeng',
                category: 'informal',
                description: 'Perbaikan saluran air dan instalasi pipa',
                basePrice: 175000,
                icon: 'Wrench',
            },
        }),
    ]);

    console.log('✅ Created services:', services.length);

    // Create sample orders
    const orders = await Promise.all([
        prisma.order.create({
            data: {
                userId: user.id,
                serviceType: 'informal',
                serviceName: 'Perbaikan AC',
                description: 'AC kamar tidur tidak dingin, perlu dicek dan diperbaiki',
                price: 150000,
                location: 'Jakarta Selatan',
                status: 'pending',
                scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            },
        }),
        prisma.order.create({
            data: {
                userId: user.id,
                serviceType: 'informal',
                serviceName: 'Cleaning Service',
                description: 'Pembersihan rumah menyeluruh setelah renovasi',
                price: 350000,
                location: 'Jakarta Pusat',
                status: 'confirmed',
                scheduledAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
            },
        }),
        prisma.order.create({
            data: {
                userId: user.id,
                serviceType: 'informal',
                serviceName: 'Tukang Ledeng',
                description: 'Perbaikan keran wastafel yang bocor',
                price: 175000,
                location: 'Tangerang',
                status: 'in-progress',
            },
        }),
        prisma.order.create({
            data: {
                userId: user.id,
                serviceType: 'formal',
                serviceName: 'Konsultasi IT',
                description: 'Setup network dan security untuk kantor',
                price: 500000,
                location: 'Jakarta Barat',
                status: 'completed',
                scheduledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            },
        }),
    ]);

    console.log('✅ Created orders:', orders.length);
    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
