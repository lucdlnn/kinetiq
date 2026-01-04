import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        console.log("--- AI Debug ---");
        console.log("Received message:", message);
        console.log("API Key present:", !!apiKey);

        if (!apiKey) {
            return NextResponse.json({
                reply: "Debug: API Key is missing. Did you restart the server after editing .env.local?"
            });
        }

        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Google API Error:", response.status, errorText);
            return NextResponse.json({ reply: `API Error: ${response.status} - ${errorText}` });
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found.";

        return NextResponse.json({ reply });

    } catch (error) {
        console.error('Server Internal Error:', error);
        return NextResponse.json({ reply: "Internal Server Error during AI request." }, { status: 500 });
    }
}
