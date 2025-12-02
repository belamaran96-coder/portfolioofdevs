import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: "React / Next.js", level: 95 },
    { name: "Three.js / R3F", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "TypeScript", level: 90 },
    { name: "Blender", level: 80 },
    { name: "TailwindCSS", level: 95 },
];

export default function Skills() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full">
                <h2 className="text-4xl font-bold mb-12 neon-text text-center">TECHNICAL PROFICIENCY</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-6 hover:border-neon-green transition-colors duration-300"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-white">{skill.name}</span>
                                <span className="text-neon-green">{skill.level}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-neon-blue to-neon-green"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
