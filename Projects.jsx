import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursor, Text, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const projects = [
    { id: 1, title: "Neon City", desc: "Cyberpunk open world demo", color: "#00f3ff" },
    { id: 2, title: "AI Core", desc: "Neural network visualizer", color: "#bc13fe" },
    { id: 3, title: "Space Drift", desc: "Physics-based flight sim", color: "#ff0055" },
];

function ProjectCard({ position, project, onClick }) {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    useCursor(hovered);

    useFrame((state, delta) => {
        ref.current.rotation.y += delta * 0.5;
        ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, hovered ? 0.2 : 0, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position} onClick={() => onClick(project)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <mesh ref={ref}>
                    <boxGeometry args={[2.5, 3.5, 0.2]} />
                    <meshPhysicalMaterial
                        color={hovered ? project.color : "#1a1a1a"}
                        transparent
                        opacity={0.8}
                        metalness={0.8}
                        roughness={0.2}
                        emissive={project.color}
                        emissiveIntensity={hovered ? 0.5 : 0.1}
                    />
                </mesh>
                <Text position={[0, 0, 0.15]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
                    {project.title}
                </Text>
            </group>
        </Float>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="w-full h-full relative">
            {/* Page-Specific 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <group position={[0, 0, 0]}>
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                position={[(i - 1) * 3.5, 0, 0]}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </group>
                </Canvas>
            </div>

            {/* UI Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center pt-20">
                <h2 className="text-4xl font-bold neon-text mb-4 pointer-events-auto">PROJECTS</h2>
                <p className="text-gray-400 pointer-events-auto">Click a card to view details</p>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            className="glass-panel p-8 max-w-2xl w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-3xl font-bold mb-4" style={{ color: selectedProject.color }}>{selectedProject.title}</h3>
                            <p className="text-gray-300 mb-6">{selectedProject.desc}</p>
                            <div className="w-full h-64 bg-black/50 rounded-lg mb-6 flex items-center justify-center border border-glass-200">
                                <span className="text-gray-500">[ Interactive Demo Placeholder ]</span>
                            </div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="px-6 py-2 rounded border border-white/20 hover:bg-white/10 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
