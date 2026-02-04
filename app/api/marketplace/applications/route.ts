import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { jobPostId, proposedPrice, estimatedDays, message, providerId, providerName } = body;

        // Validation
        if (!jobPostId || !proposedPrice || !estimatedDays || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create application object
        const application = {
            id: `app_${Date.now()}`,
            jobPostId,
            providerId: providerId || 'demo_provider',
            providerName: providerName || 'Demo Provider',
            proposedPrice: parseInt(proposedPrice),
            estimatedDays: parseInt(estimatedDays),
            message,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        // For now, just return success
        // In production, this would save to database
        return NextResponse.json({
            success: true,
            application,
            message: 'Aplikasi berhasil dikirim!',
        });
    } catch (error) {
        console.error('Application submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
