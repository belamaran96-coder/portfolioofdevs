import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <h1 className="text-6xl md:text-8xl font-bold mb-4 neon-text tracking-tighter">
                    FUTURE <br /> PORTFOLIO
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-widest uppercase">
                    Creative Developer & 3D Artist
                </p>

                <div className="flex justify-center gap-4">
                    <button className="px-8 py-3 rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 font-bold tracking-wider">
                        ENTER SYSTEM
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
