import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Education', path: '/education' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
];

export default function Navbar() {
    return (
        <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 pointer-events-auto">
            {navItems.map((item, index) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                        `group relative flex items-center p-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-neon-blue/20' : 'hover:bg-white/5'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {/* Icon / Dot */}
                            <div className={`w-3 h-3 rounded-full border transition-all duration-300 ${isActive
                                    ? 'bg-neon-blue border-neon-blue shadow-[0_0_10px_#00f3ff]'
                                    : 'bg-transparent border-gray-500 group-hover:border-white'
                                }`} />

                            {/* Label (Tooltip style) */}
                            <span className={`absolute left-10 px-3 py-1 rounded-md bg-black/80 border border-glass-200 text-sm whitespace-nowrap transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 text-neon-blue' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-300'
                                }`}>
                                {item.name}
                            </span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
