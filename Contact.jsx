import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateResponse } from '../api/gemini';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState('');

    const handleAiAssist = async () => {
        if (!form.message) return;
        setIsGenerating(true);
        try {
            const prompt = `Refine this contact message to be more professional yet friendly: "${form.message}"`;
            const response = await generateResponse(prompt);
            setAiSuggestion(response);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    const useSuggestion = () => {
        setForm({ ...form, message: aiSuggestion });
        setAiSuggestion('');
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 max-w-lg w-full relative z-10"
            >
                <h2 className="text-3xl font-bold mb-6 neon-text text-center">ESTABLISH UPLINK</h2>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm text-neon-blue mb-1">Identity</label>
                        <input
                            type="text"
                            className="w-full bg-black/50 border border-glass-300 rounded p-2 text-white focus:border-neon-blue outline-none"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-neon-blue mb-1">Frequency (Email)</label>
                        <input
                            type="email"
                            className="w-full bg-black/50 border border-glass-300 rounded p-2 text-white focus:border-neon-blue outline-none"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-neon-blue mb-1">Transmission</label>
                        <textarea
                            rows="4"
                            className="w-full bg-black/50 border border-glass-300 rounded p-2 text-white focus:border-neon-blue outline-none"
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                        />
                    </div>

                    {/* AI Assist Button */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleAiAssist}
                            disabled={isGenerating || !form.message}
                            className="flex-1 py-2 rounded border border-neon-purple text-neon-purple hover:bg-neon-purple/20 transition-colors text-sm"
                        >
                            {isGenerating ? 'AI Optimizing...' : '✨ AI Polish'}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 rounded bg-neon-blue/20 border border-neon-blue text-neon-blue hover:bg-neon-blue/40 transition-colors font-bold"
                        >
                            SEND
                        </button>
                    </div>

                    {/* AI Suggestion Preview */}
                    {aiSuggestion && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-neon-purple/10 border border-neon-purple/30 p-3 rounded mt-2"
                        >
                            <p className="text-xs text-gray-300 mb-2">Suggestion:</p>
                            <p className="text-sm text-white italic mb-2">"{aiSuggestion}"</p>
                            <button
                                onClick={useSuggestion}
                                className="text-xs text-neon-green hover:underline"
                            >
                                Use this version
                            </button>
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    );
}
