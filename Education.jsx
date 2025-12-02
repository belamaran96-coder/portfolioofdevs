import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
    {
        degree: "Master of Computer Science",
        school: "Tech University",
        year: "2021 - 2023",
        desc: "Specialized in AI and Computer Graphics."
    },
    {
        degree: "Bachelor of Design",
        school: "Creative Institute",
        year: "2017 - 2021",
        desc: "Focus on Interactive Media and UX."
    }
];

export default function Education() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel p-8"
                >
                    <h2 className="text-4xl font-bold mb-8 neon-text">EDUCATION</h2>
                    <div className="space-y-8">
                        {educationData.map((item, index) => (
                            <div key={index} className="border-l-2 border-neon-purple pl-4">
                                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                                <p className="text-neon-blue">{item.school}</p>
                                <p className="text-sm text-gray-400 mb-2">{item.year}</p>
                                <p className="text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Placeholder for 3D interactive element position */}
                <div className="hidden md:flex items-center justify-center">
                    <div className="text-gray-500 text-sm uppercase tracking-widest animate-pulse">
                        [ 3D Visualization Active ]
                    </div>
                </div>
            </div>
        </div>
    );
}
