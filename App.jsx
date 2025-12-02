import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, Loader, Preload, Stars } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

// Components
import Navbar from './components/Navbar';
import RobotAssistant from './components/RobotAssistant';
import ChatWindow from './components/ChatWindow';
import VoiceControls from './components/VoiceControls';

// Routes (Lazy Loaded)
const Home = React.lazy(() => import('./routes/Home'));
const Education = React.lazy(() => import('./routes/Education'));
const Skills = React.lazy(() => import('./routes/Skills'));
const Projects = React.lazy(() => import('./routes/Projects'));
const Experience = React.lazy(() => import('./routes/Experience'));
const Timeline = React.lazy(() => import('./routes/Timeline'));
const Contact = React.lazy(() => import('./routes/Contact'));
const About = React.lazy(() => import('./routes/About'));

// Scene Manager Component
const SceneManager = ({ isChatOpen, setIsChatOpen }) => {
    const location = useLocation();

    // Determine which 3D scene elements to show based on route
    // This allows us to keep one Canvas but change the content
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Persistent Robot */}
            <RobotAssistant isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} currentPath={location.pathname} />

            {/* Post Processing */}
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};

const Content = () => {
    const location = useLocation();
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <>
            {/* Global 3D Background */}
            <div id="canvas-container">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{ antialias: false, stencil: false, depth: true }}
                >
                    <Suspense fallback={null}>
                        <SceneManager isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
                    </Suspense>
                    <Preload all />
                </Canvas>
            </div>

            {/* UI Overlay */}
            <div id="ui-layer" className="w-full h-full flex flex-col pointer-events-none">
                <Navbar />

                <main className="flex-grow w-full h-full relative pointer-events-auto overflow-y-auto overflow-x-hidden">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Suspense fallback={null}><Home /></Suspense>} />
                            <Route path="/education" element={<Suspense fallback={null}><Education /></Suspense>} />
                            <Route path="/skills" element={<Suspense fallback={null}><Skills /></Suspense>} />
                            <Route path="/projects" element={<Suspense fallback={null}><Projects /></Suspense>} />
                            <Route path="/experience" element={<Suspense fallback={null}><Experience /></Suspense>} />
                            <Route path="/timeline" element={<Suspense fallback={null}><Timeline /></Suspense>} />
                            <Route path="/contact" element={<Suspense fallback={null}><Contact /></Suspense>} />
                            <Route path="/about" element={<Suspense fallback={null}><About /></Suspense>} />
                        </Routes>
                    </AnimatePresence>
                </main>

                <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-auto">
                    <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                    <VoiceControls />
                </div>
            </div>
            <Loader />
        </>
    );
};

function App() {
    return (
        <Router>
            <Content />
        </Router>
    );
}

export default App;
