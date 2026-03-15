import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

function SplashScreen({ onFinish }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Disable scrolling while splash screen is active
        document.body.style.overflow = 'hidden';

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        document.body.style.overflow = '';
                        onFinish();
                    }, 500); // Slight delay after hitting 100%
                    return 100;
                }
                // Randomize increment to feel more like a real loading process (5 to 15)
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 150);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, [onFinish]);

    return (
        <AnimatePresence>
            <motion.div 
                className="splash-screen"
                initial={{ opacity: 1 }}
                exit={{ 
                    opacity: 0, 
                    y: -100,
                    scale: 1.1,
                    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
                }}
            >
                <div className="splash-background">
                    <div className="cosmic-pulse"></div>
                </div>

                <div className="splash-content">
                    <motion.div 
                        className="fb-logo-container"
                        initial="hidden"
                        animate="visible"
                    >
                        <svg className="fb-logo-svg" viewBox="0 0 100 100">
                            {/* The "F" */}
                            <motion.path
                                d="M30 25 H55 V35 H40 V45 H50 V55 H40 V75 H30 Z"
                                fill="transparent"
                                stroke="var(--accent)"
                                strokeWidth="1.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                            />
                            {/* The "B" */}
                            <motion.path
                                d="M60 25 H75 C85 25, 85 45, 75 45 H60 V25 M60 45 H78 C88 45, 88 75, 78 75 H60 V45"
                                fill="transparent"
                                stroke="var(--accent-secondary)"
                                strokeWidth="1.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                            />
                            
                            {/* Solid Fill appearing at the end */}
                            <motion.path
                                d="M30 25 H55 V35 H40 V45 H50 V55 H40 V75 H30 Z"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: progress > 80 ? 0.1 : 0 }}
                                fill="var(--accent)"
                            />
                            <motion.path
                                d="M60 25 H75 C85 25, 85 45, 75 45 H60 V25 M60 45 H78 C88 45, 88 75, 78 75 H60 V45"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: progress > 80 ? 0.1 : 0 }}
                                fill="var(--accent-secondary)"
                            />
                        </svg>

                        <motion.div 
                            className="logo-text-reveal"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: progress > 50 ? 1 : 0 }}
                        >
                            Falguni Bidave
                        </motion.div>
                    </motion.div>
                    
                    <div className="splash-loader">
                        <div className="loader-ring">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                                <motion.circle 
                                    cx="50" cy="50" r="45" 
                                    stroke="var(--accent)" 
                                    strokeWidth="2" 
                                    fill="none"
                                    strokeDasharray="283"
                                    animate={{ strokeDashoffset: 283 - (2.83 * progress) }}
                                    transition={{ ease: "easeOut" }}
                                />
                            </svg>
                            <span className="loader-percentage">{progress}%</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default SplashScreen;
