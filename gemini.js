import axios from 'axios';

const API_URL = import.meta.env.PROD ? '/api/gemini' : 'http://localhost:3001/api/gemini';

export const generateResponse = async (prompt, context = '') => {
    try {
        const response = await axios.post(API_URL, {
            prompt,
            context
        });
        return response.data.response;
    } catch (error) {
        console.error('Error calling Gemini:', error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
};
