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

        const systemInstruction = `You are Kinetiq Coach, an elite fitness AI.
    - Format response with Markdown: Use # or ## for titles, - for lists, and **bold** for emphasis.
    - Be concise but encouraging.
    - If asked for meals: Provide a catchy name, ingredients list, nutritional breakdown, and a "Search Link" for the recipe (e.g. [Search Recipe](https://www.google.com/search?q=recipe+name)).
    - Use emojis sparingly but effectively.
    
    CRITICAL FORMATTING RULES:
    1. Always use ** Bold ** for key terms, numbers, or emphasis.
    2. Use Lists(- item) for steps, meals, or pros / cons.
    3. Never output large blocks of unformatted text. Keep paragraphs short.

    If asked for a MEAL PLAN:
    - Provide a specific example meal with macronutrients.
    - Format: "**Meal Name**\n- Calories: X\n- P: Xg | C: Xg | F: Xg\n- Ingredients: ..."

    Context: The user is currently in the ${new Date().getFullYear()} season.`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }],
                systemInstruction: {
                    parts: [{ text: systemInstruction }]
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Google API Error:", response.status, errorText);
            return NextResponse.json({ reply: `API Error: ${response.status} - ${errorText} ` });
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found.";

        return NextResponse.json({ reply });

    } catch (error) {
        console.error('Server Internal Error:', error);
        return NextResponse.json({ reply: "Internal Server Error during AI request." }, { status: 500 });
    }
}
