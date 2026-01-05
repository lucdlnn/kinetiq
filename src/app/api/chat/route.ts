import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: google('gemini-1.5-flash'),
        messages,
        system: `You are Kinetiq Coach, an elite fitness AI assistant.
    - Format responses with clean Markdown.
    - Be concise, professional, and encouraging.
    - For meals: Include macros (P/C/F) and calories.
    - For workouts: Structure with Warm-up, Main Set, Cool-down.`,
    });

    return result.toDataStreamResponse();
}
