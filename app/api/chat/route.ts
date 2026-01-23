import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { MOCK_SERVICES, MOCK_PROFILES } from '@/lib/mock-data';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Extract the latest user query
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content || "";

    // Simple RAG / Search Logic
    const lowerQuery = query.toLowerCase();

    let searchContext = "";
    if (lowerQuery.length > 2) {
        const matches = MOCK_SERVICES.filter(s =>
            s.title.toLowerCase().includes(lowerQuery) ||
            s.description.toLowerCase().includes(lowerQuery) ||
            s.subcategory.toLowerCase().includes(lowerQuery)
        );

        if (matches.length > 0) {
            const results = matches.map(s => {
                const worker = MOCK_PROFILES.find(p => p.id === s.worker_id);
                return `- Service: ${s.title} (${s.subcategory})\n  Price: Rp ${s.price.toLocaleString('id-ID')}\n  Worker: ${worker?.full_name} (${worker?.rating} stars)`;
            }).join('\n');
            searchContext = `\n\nRELEVANT SERVICES FOUND IN DATABASE:\n${results}`;
        } else {
            searchContext = "\n\nNO DIRECT MATCHES FOUND IN DATABASE. Suggest checking general categories.";
        }
    }

    const result = streamText({
        model: google('gemini-2.5-flash'),
        messages,
        system: `You are "Andalan AI", a smart assistant for the Andalan service marketplace.
    Your goal is to help users find the right professional for their needs based on the provided context.
    
    1. Diagnose the user's problem based on their message.
    2. Recommend a specific service category (Formal or Informal).
    3. Use the provided "RELEVANT SERVICES FOUND" context to suggest specific professionals.
    4. If matches are found, list them clearly with prices and worker names.
    5. If no matches found, give general advice and ask for more details.
    
    Tone: Professional, helpful, friendly, and concise. Use Indonesian language.
    ${searchContext}`,
    });

    return result.toTextStreamResponse();
}
