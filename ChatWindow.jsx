import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateResponse } from '../api/gemini';

export default function ChatWindow({ isOpen, onClose }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hi! I'm your holographic assistant. Ask me anything about this portfolio!" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const speak = (text) => {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        // Try to find a robotic voice
        const voices = window.speechSynthesis.getVoices();
        const robotVoice = voices.find(v => v.name.includes('Google US English')) || voices[0];
        utterance.voice = robotVoice;
        utterance.pitch = 1.2; // Slightly higher pitch for robot
        utterance.rate = 1.1;
        window.speechSynthesis.speak(utterance);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Context about the portfolio owner
            const context = `You are a helpful robot assistant for a portfolio website. 
      The owner is a Full Stack Developer and 3D Artist. 
      Answer questions about their skills (React, Three.js, Node), projects, and experience. 
      Be concise, friendly, and a bit robotic/futuristic in tone.`;

            const responseText = await generateResponse(input, context);

            const botMsg = { role: 'assistant', text: responseText };
            setMessages(prev => [...prev, botMsg]);
            speak(responseText);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble connecting. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="glass-panel w-80 md:w-96 h-[500px] flex flex-col overflow-hidden neon-border"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-glass-200 flex justify-between items-center bg-black/40">
                        <h3 className="text-neon-blue font-mono font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
                            AI ASSISTANT
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                        ? 'bg-neon-blue/20 text-white border border-neon-blue/50'
                                        : 'bg-glass-200 text-gray-200 border border-glass-300'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-glass-200 p-3 rounded-lg text-xs text-neon-blue animate-pulse">
                                    Processing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-glass-200 bg-black/40">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-black/50 border border-glass-300 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-neon-blue/20 hover:bg-neon-blue/40 text-neon-blue border border-neon-blue rounded px-3 transition-colors"
                            >
                                SEND
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
