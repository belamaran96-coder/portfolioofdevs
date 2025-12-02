import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus, Text } from '@react-three/drei';

function TimelineRing({ position, year, text, color }) {
    return (
        <group position={position}>
            <Torus args={[2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </Torus>
            <Text position={[0, 0.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                {year}
            </Text>
            <Text position={[0, -0.5, 0]} fontSize={0.2} color="#ccc" anchorX="center" anchorY="middle">
                {text}
            </Text>
        </group>
    );
}

export default function Timeline() {
    return (
        <div className="w-full h-full relative">
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

                    <TimelineRing position={[0, 0, 0]} year="2024" text="Future Goals" color="#00f3ff" />
                    <TimelineRing position={[0, -2, 0]} year="2023" text="Senior Engineer" color="#bc13fe" />
                    <TimelineRing position={[0, -4, 0]} year="2021" text="Master's Degree" color="#ff0055" />
                    <TimelineRing position={[0, -6, 0]} year="2019" text="Career Start" color="#0aff00" />

                    <gridHelper args={[20, 20, 0x444444, 0x222222]} position={[0, -8, 0]} />
                </Canvas>
            </div>

            <div className="absolute top-20 left-0 w-full text-center pointer-events-none">
                <h2 className="text-4xl font-bold neon-text">CHRONOLOGY</h2>
                <p className="text-sm text-gray-500 mt-2">Drag to rotate view</p>
            </div>
        </div>
    );
}
