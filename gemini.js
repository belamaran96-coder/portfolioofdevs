import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    // CORS handling for Vercel
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, context } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Server missing API Key' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemInstruction = context
            ? `Context: ${context}\n\nUser: ${prompt}`
            : prompt;

        const result = await model.generateContent(systemInstruction);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ response: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            error: 'Failed to generate response',
            details: error.message
        });
    }
}
