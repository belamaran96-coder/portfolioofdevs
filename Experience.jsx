import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Senior Frontend Engineer",
        company: "CyberCorp",
        period: "2023 - Present",
        desc: "Leading the development of next-gen web interfaces using React and WebGL."
    },
    {
        role: "Creative Developer",
        company: "Digital Dreams",
        period: "2021 - 2023",
        desc: "Built immersive brand experiences and 3D product configurators."
    },
    {
        role: "UI/UX Designer",
        company: "StartUp Inc",
        period: "2019 - 2021",
        desc: "Designed user-centric interfaces for mobile and web applications."
    }
];

export default function Experience() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8 overflow-y-auto">
            <div className="max-w-4xl w-full">
                <h2 className="text-4xl font-bold mb-12 neon-text text-center">EXPERIENCE LOG</h2>

                <div className="relative border-l-2 border-neon-blue/30 ml-4 md:ml-0 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-neon-blue shadow-[0_0_10px_#00f3ff]" />

                            <div className="glass-panel p-6 hover:bg-white/5 transition-colors">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                    <span className="text-neon-purple font-mono">{exp.period}</span>
                                </div>
                                <h4 className="text-lg text-neon-blue mb-4">{exp.company}</h4>
                                <p className="text-gray-300">{exp.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
