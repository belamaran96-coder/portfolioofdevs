import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { generateResponse } from '../api/gemini';

// Placeholder for the robot model - instructions to replace are in README
// If you have a real model, ensure it has animations like 'Idle', 'Wave', 'Talk'
const MODEL_URL = '/robot.glb';

export default function RobotAssistant({ isChatOpen, setIsChatOpen, currentPath }) {
    const group = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [message, setMessage] = useState('');

    // Load model (with error handling fallback to primitive)
    let nodes, materials, animations;
    try {
        // This might fail if the file doesn't exist, so we wrap in try/catch logic or use error boundary
        // For this code generation, we assume the user will put a file there or we use a fallback mesh if useGLTF fails?
        // useGLTF doesn't support try/catch easily in render. 
        // We will use a simple primitive if the GLB is missing in the real world, but here we write the code for the GLB.
        const gltf = useGLTF(MODEL_URL);
        nodes = gltf.nodes;
        materials = gltf.materials;
        animations = gltf.animations;
    } catch (e) {
        // Fallback handled by Suspense or ErrorBoundary in parent, 
        // but for safety in this demo code we might want a fallback visual.
    }

    const { actions, names } = useAnimations(animations || [], group);

    // Animation Logic
    useEffect(() => {
        if (!actions) return;

        // Default animation
        const idleAction = actions['Idle'] || actions[names[0]];
        if (idleAction) idleAction.reset().fadeIn(0.5).play();

        return () => {
            if (idleAction) idleAction.fadeOut(0.5);
        };
    }, [actions, names]);

    // React to path changes
    useEffect(() => {
        // Robot could say something or wave when page changes
        if (actions && actions['Wave']) {
            actions['Wave'].reset().fadeIn(0.5).play().setLoop(THREE.LoopOnce);
            setTimeout(() => actions['Wave'].fadeOut(0.5), 2000);
        }
    }, [currentPath, actions]);

    // Floating animation logic
    useFrame((state) => {
        if (!group.current) return;

        // Look at mouse slightly
        const { x, y } = state.mouse;
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.5, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.2, 0.1);
    });

    const handleClick = () => {
        setIsChatOpen(!isChatOpen);
        // Trigger wave or interact animation
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group
                ref={group}
                position={[3, -1.5, 0]} // Bottom right-ish in 3D space relative to camera
                scale={[0.5, 0.5, 0.5]}
                onClick={handleClick}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
                dispose={null}
            >
                {/* Visual Fallback if no model loaded yet or failed */}
                <mesh visible={!nodes}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.5} wireframe />
                </mesh>

                {/* If nodes exist (GLB loaded), render them here. 
            Example structure for a simple bot. 
            Adjust based on actual GLB structure. 
        */}
                {nodes && (
                    <primitive object={nodes.Scene || nodes.root} />
                )}

                {/* Holographic Ring Effect */}
                <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[1.5, 1.6, 64]} />
                    <meshBasicMaterial color="#00f3ff" transparent opacity={0.3} side={THREE.DoubleSide} />
                </mesh>

                {/* Interaction Hint */}
                {isHovered && (
                    <Html position={[0, 2.5, 0]} center>
                        <div className="bg-black/80 text-neon-blue px-3 py-1 rounded-full text-xs border border-neon-blue whitespace-nowrap">
                            Click to Chat
                        </div>
                    </Html>
                )}
            </group>
        </Float>
    );
}

useGLTF.preload(MODEL_URL);
