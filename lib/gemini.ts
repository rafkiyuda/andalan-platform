import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

// ANDALAN Instant - Parse user intent from natural language
export async function parseIntent(userInput: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Analyze this service request and extract structured information:
"${userInput}"

Return a JSON object with:
- service_type: type of service needed (e.g., "plumbing", "electrical", "cleaning", "ac_repair")
- location: location mentioned or "not specified"
- urgency: "low", "medium", or "high"
- description: brief summary of the problem

Example output:
{
  "service_type": "plumbing",
  "location": "Jakarta Selatan",
  "urgency": "high",
  "description": "Pipe leak in bathroom"
}

Only return the JSON, no other text.
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error('Failed to parse intent');
    } catch (error) {
        console.error('Error parsing intent:', error);
        return {
            service_type: 'general',
            location: 'not specified',
            urgency: 'medium',
            description: userInput,
        };
    }
}

// ANDALAN Diagnosis - Analyze problem from image or text
export async function analyzeProblem(input: {
    text?: string;
    imageBase64?: string;
}) {
    const model = genAI.getGenerativeModel({
        model: input.imageBase64 ? 'gemini-pro-vision' : 'gemini-pro',
    });

    let prompt = `
Analyze this problem and provide a diagnosis:
${input.text || 'Analyze the image provided'}

Return a JSON object with:
- problem: type of problem detected
- urgency: "low", "medium", or "high"
- recommended_service: what type of professional is needed
- price_estimation: estimated cost range in IDR (e.g., "100k - 300k")
- description: detailed explanation of the problem

Only return the JSON, no other text.
`;

    try {
        let result;
        if (input.imageBase64) {
            result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: input.imageBase64,
                    },
                },
            ]);
        } else {
            result = await model.generateContent(prompt);
        }

        const response = await result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error('Failed to analyze problem');
    } catch (error) {
        console.error('Error analyzing problem:', error);
        return {
            problem: 'unknown',
            urgency: 'medium',
            recommended_service: 'general_service',
            price_estimation: '100k - 500k',
            description: 'Unable to analyze. Please provide more details.',
        };
    }
}

// General AI response generation
export async function generateResponse(prompt: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}
