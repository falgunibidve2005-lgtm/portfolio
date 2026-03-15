import { Suspense, lazy, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import './Hero.css'

const SystemFlow = lazy(() => import('./SystemFlow'))

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
}

function Hero() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for movement
    const springConfig = { damping: 25, stiffness: 150 }
    const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig)
    const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window
            mouseX.set((clientX / innerWidth) - 0.5)
            mouseY.set((clientY / innerHeight) - 0.5)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const handleNavClick = (e, targetId) => {
        e.preventDefault()
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            window.history.pushState(null, null, `#${targetId}`)
        }
    }

    return (
        <section className="hero" id="hero">
            <div className="hero-container">
                <div className="hero-split">
                    <motion.div 
                        className="hero-content"
                        style={{ x, y }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="hero-badge">
                            <span className="hero-badge-dot"></span>
                            Open to Opportunities
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="hero-greeting">
                            Hi, I'm <span className="text-gradient">Falguni Bidave</span>
                        </motion.h1>

                        <motion.h2 variants={itemVariants} className="hero-role">
                            Full Stack Developer
                        </motion.h2>

                        <motion.p variants={itemVariants} className="hero-tagline">
                            Crafting high-performance web solutions with modern tech and clean architecture.
                        </motion.p>

                        <motion.div variants={itemVariants} className="hero-cta">
                            <a
                                href="#projects"
                                className="btn btn-primary"
                                onClick={(e) => handleNavClick(e, 'projects')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                </svg>
                                View Projects
                            </a>
                            <a
                                href="/FalguniBidave_CV.pdf"
                                className="btn btn-secondary"
                                download="FalguniBidave_CV.pdf"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download CV
                            </a>
                            <a
                                href="#contact"
                                className="btn btn-secondary"
                                onClick={(e) => handleNavClick(e, 'contact')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                Get in Touch
                            </a>
                        </motion.div>
                    </motion.div>

                    <div className="hero-visual">
                        <Suspense fallback={null}>
                            <SystemFlow />
                        </Suspense>
                    </div>
                </div>
            </div>

            <div className="hero-scroll">
                <span>Scroll to explore</span>
                <div className="hero-scroll-line"></div>
            </div>
        </section>
    )
}

export default Hero
