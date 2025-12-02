import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel p-8 max-w-3xl w-full text-center"
            >
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full mb-6 p-1">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                        <span className="text-4xl">👨‍🚀</span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-4 neon-text">ABOUT THE CREATOR</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                    I am a passionate developer bridging the gap between design and technology.
                    With a background in traditional art and a love for code, I create immersive
                    web experiences that push the boundaries of what's possible in a browser.
                </p>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 border border-glass-200 rounded">
                        <h3 className="text-2xl font-bold text-white">5+</h3>
                        <p className="text-xs text-gray-400">Years Exp</p>
                    </div>
                    <div className="p-4 border border-glass-200 rounded">
                        <h3 className="text-2xl font-bold text-white">50+</h3>
                        <p className="text-xs text-gray-400">Projects</p>
                    </div>
                    <div className="p-4 border border-glass-200 rounded">
                        <h3 className="text-2xl font-bold text-white">100%</h3>
                        <p className="text-xs text-gray-400">Passion</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
