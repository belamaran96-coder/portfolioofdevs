import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VoiceControls() {
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();
    const recognitionRef = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                console.log('Voice Command:', transcript);
                handleCommand(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const handleCommand = (command) => {
        if (command.includes('home')) navigate('/');
        else if (command.includes('project')) navigate('/projects');
        else if (command.includes('skill')) navigate('/skills');
        else if (command.includes('contact')) navigate('/contact');
        else if (command.includes('about')) navigate('/about');
        else if (command.includes('experience')) navigate('/experience');
        else if (command.includes('education')) navigate('/education');
        else if (command.includes('timeline')) navigate('/timeline');
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    if (!recognitionRef.current) return null; // Hide if not supported

    return (
        <button
            onClick={toggleListening}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${isListening
                    ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                    : 'bg-black/40 border-neon-blue text-neon-blue hover:bg-neon-blue/20'
                }`}
            title="Voice Control"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
        </button>
    );
}

import { useRef } from 'react';
