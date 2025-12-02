import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt, context } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Server missing API Key' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Combine context and prompt for better persona adherence
        const systemInstruction = context
            ? `Context: ${context}\n\nUser: ${prompt}`
            : prompt;

        const result = await model.generateContent(systemInstruction);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            error: 'Failed to generate response',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
