import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    PerspectiveCamera,
    Float,
    Sphere,
    Torus,
    Points,
    PointMaterial
} from '@react-three/drei'
import { fetchSystemStatus, startPolling } from '../utils/api'
import './SystemFlow.css'

// Detailed small central sphere - the main focal point
function DetailedCentralSphere({ isActive }) {
    const sphereRef = useRef()
    const innerSphereRef = useRef()
    const coreRef = useRef()

    useFrame((state) => {
        const time = state.clock.elapsedTime
        if (sphereRef.current) {
            sphereRef.current.rotation.y = time * 0.3
            sphereRef.current.rotation.x = Math.sin(time * 0.15) * 0.1
            
            const scale = 1 + Math.sin(time * 2) * 0.04
            sphereRef.current.scale.setScalar(scale * (isActive ? 1.08 : 1))
        }

        if (innerSphereRef.current) {
            innerSphereRef.current.rotation.x = -time * 0.5
            innerSphereRef.current.rotation.z = time * 0.4
        }

        if (coreRef.current) {
            coreRef.current.rotation.y = time * 0.8
        }
    })

    return (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
            <group ref={sphereRef}>
                {/* Outer detailed sphere */}
                <Sphere args={[1.2, 64, 64]}>
                    <meshStandardMaterial 
                        color="#3b82f6" 
                        emissive="#1e40af"
                        emissiveIntensity={isActive ? 0.4 : 0.2}
                        transparent
                        opacity={0.7}
                        roughness={0.1}
                        metalness={0.9}
                    />
                </Sphere>

                {/* Inner wireframe sphere */}
                <Sphere ref={innerSphereRef} args={[0.9, 32, 32]}>
                    <meshStandardMaterial 
                        color="#60a5fa" 
                        emissive="#3b82f6"
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.4}
                        wireframe
                    />
                </Sphere>

                {/* Core sphere */}
                <Sphere ref={coreRef} args={[0.4, 32, 32]}>
                    <meshStandardMaterial 
                        color="#1e40af" 
                        emissive="#1e40af"
                        emissiveIntensity={isActive ? 0.8 : 0.5}
                        metalness={1.0}
                        roughness={0.0}
                    />
                </Sphere>
            </group>
        </Float>
    )
}

// Detailed small orbital rings around the sphere
function DetailedOrbitalRings({ isActive }) {
    const ringsRef = useRef()
    const innerRingsRef = useRef()

    useFrame((state) => {
        const time = state.clock.elapsedTime
        if (ringsRef.current) {
            ringsRef.current.rotation.y = time * 0.2
            ringsRef.current.rotation.z = Math.sin(time * 0.12) * 0.08
        }

        if (innerRingsRef.current) {
            innerRingsRef.current.rotation.x = time * 0.25
            innerRingsRef.current.rotation.y = -time * 0.15
        }
    })

    return (
        <group>
            {/* Outer detailed rings */}
            <group ref={ringsRef}>
                <Torus args={[2.2, 0.04, 16, 100]}>
                    <meshStandardMaterial 
                        color="#60a5fa" 
                        emissive="#3b82f6"
                        emissiveIntensity={isActive ? 0.5 : 0.25}
                        transparent
                        opacity={0.8}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Torus>
                
                <Torus args={[1.9, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial 
                        color="#8b5cf6" 
                        emissive="#7c3aed"
                        emissiveIntensity={isActive ? 0.5 : 0.25}
                        transparent
                        opacity={0.7}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Torus>
                
                <Torus args={[1.6, 0.025, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <meshStandardMaterial 
                        color="#10b981" 
                        emissive="#059669"
                        emissiveIntensity={isActive ? 0.5 : 0.25}
                        transparent
                        opacity={0.6}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Torus>
            </group>

            {/* Inner detailed rings */}
            <group ref={innerRingsRef}>
                <Torus args={[1.4, 0.02, 12, 64]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                    <meshStandardMaterial 
                        color="#f59e0b" 
                        emissive="#d97706"
                        emissiveIntensity={0.4}
                        transparent
                        opacity={0.5}
                    />
                </Torus>
                
                <Torus args={[1.1, 0.015, 12, 64]} rotation={[0, Math.PI / 3, Math.PI / 4]}>
                    <meshStandardMaterial 
                        color="#ec4899" 
                        emissive="#db2777"
                        emissiveIntensity={0.4}
                        transparent
                        opacity={0.4}
                    />
                </Torus>
            </group>
        </group>
    )
}

// Detailed small particle field
function DetailedParticleField({ count = 120 }) {
    const points = useRef()
    const innerPoints = useRef()
    
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12
            positions[i * 3 + 2] = (Math.random() - 0.5) * 12
        }
        return positions
    }, [count])

    const innerParticlesPosition = useMemo(() => {
        const positions = new Float32Array(60 * 3)
        for (let i = 0; i < 60; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 6
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6
        }
        return positions
    }, [])

    useFrame((state) => {
        if (points.current) {
            const time = state.clock.elapsedTime
            points.current.rotation.y = time * 0.015
            points.current.rotation.x = time * 0.008
        }

        if (innerPoints.current) {
            const time = state.clock.elapsedTime
            innerPoints.current.rotation.y = -time * 0.025
            innerPoints.current.rotation.z = time * 0.012
        }
    })

    return (
        <group>
            {/* Outer particle field */}
            <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#64748b"
                    size={0.025}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>

            {/* Inner particle field */}
            <Points ref={innerPoints} positions={innerParticlesPosition} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.035}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    )
}

// Detailed corner accent spheres - small but intricate
function DetailedCornerSpheres({ scrollFactor }) {
    const spheresRef = useRef()

    useFrame((state) => {
        const time = state.clock.elapsedTime
        if (spheresRef.current) {
            spheresRef.current.children.forEach((sphereGroup, i) => {
                const sphere = sphereGroup.children[0]
                const ring = sphereGroup.children[1]
                
                if (sphere) {
                    sphere.rotation.y = time * (0.4 + i * 0.1)
                    sphere.rotation.x = Math.sin(time + i) * 0.1
                }
                
                if (ring) {
                    ring.rotation.z = time * (0.3 + i * 0.05)
                }
                
                sphereGroup.position.y += Math.sin(time + i) * 0.001
            })
        }
    })

    const positions = [
        [3.5, 2, 1.5],
        [-3.5, 2, 1.5], 
        [3.5, -2, -1.5],
        [-3.5, -2, -1.5]
    ]

    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

    return (
        <group ref={spheresRef}>
            {positions.map((pos, i) => (
                <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.15} floatIntensity={0.4}>
                    <group>
                        {/* Main sphere */}
                        <Sphere position={pos} args={[0.4, 32, 32]}>
                            <meshStandardMaterial 
                                color={colors[i]} 
                                emissive={colors[i]}
                                emissiveIntensity={0.3}
                                transparent
                                opacity={0.8}
                                metalness={0.7}
                                roughness={0.3}
                            />
                        </Sphere>
                        
                        {/* Detail ring around each sphere */}
                        <Torus position={pos} args={[0.6, 0.02, 8, 32]}>
                            <meshStandardMaterial 
                                color={colors[i]} 
                                emissive={colors[i]}
                                emissiveIntensity={0.4}
                                transparent
                                opacity={0.6}
                            />
                        </Torus>
                    </group>
                </Float>
            ))}
        </group>
    )
}

// Main detailed and small 3D scene
function DetailedSmall3DScene({ systemData, scrollFactor }) {
    const groupRef = useRef()
    const { pointer } = useThree()

    useFrame(() => {
        if (groupRef.current) {
            // More responsive mouse interaction for detailed model
            groupRef.current.rotation.y = pointer.x * 0.08
            groupRef.current.rotation.x = -pointer.y * 0.05
            
            // Subtle scroll movement
            groupRef.current.position.y = scrollFactor * 0.4
        }
    })

    const activeSection = useMemo(() => {
        if (scrollFactor < 0.25) return 'hero'
        if (scrollFactor < 0.5) return 'projects'
        if (scrollFactor < 0.75) return 'skills'
        return 'contact'
    }, [scrollFactor])

    return (
        <group ref={groupRef}>
            {/* Detailed particle background */}
            <DetailedParticleField count={100} />
            
            {/* Main detailed central sphere */}
            <DetailedCentralSphere isActive={activeSection === 'hero'} />
            
            {/* Detailed orbital rings */}
            <DetailedOrbitalRings isActive={activeSection === 'projects'} />
            
            {/* Detailed corner accent spheres */}
            <DetailedCornerSpheres scrollFactor={scrollFactor} />
            
            {/* Enhanced lighting for details */}
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-5, -5, -5]} intensity={0.8} color="#3b82f6" />
            <pointLight position={[0, 8, 0]} intensity={0.9} color="#8b5cf6" />
            <pointLight position={[3, -3, 3]} intensity={0.6} color="#10b981" />
            <pointLight position={[-3, 3, -3]} intensity={0.5} color="#f59e0b" />
        </group>
    )
}

function SystemFlow() {
    const [systemData, setSystemData] = useState(null)
    const [apiStatus, setApiStatus] = useState('checking')
    const [statusMessage, setStatusMessage] = useState('System Loading...')
    const [scrollFactor, setScrollFactor] = useState(0)
    const [isInView, setIsInView] = useState(true)
    const { supported, reducedMotion, isMobile } = useWebGLSupport()

    useEffect(() => {
        const handleScroll = () => {
            const factor = Math.min(
                window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1),
                1
            )
            setScrollFactor(factor)

            const heroElement = document.getElementById('hero')
            if (heroElement) {
                const rect = heroElement.getBoundingClientRect()
                setIsInView(rect.bottom > 0 && rect.top < window.innerHeight * 1.5)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        const cleanupPoll = startPolling(
            fetchSystemStatus,
            (data) => {
                setSystemData(data)
                const isOnline = data.status !== 'offline'
                setApiStatus(isOnline ? 'online' : 'offline')
                if (isOnline) {
                    setStatusMessage('System Active')
                    setTimeout(() => setStatusMessage('All Systems Operational'), 3000)
                } else {
                    setStatusMessage('System Offline')
                }
            },
            isMobile ? 12000 : 8000
        )

        return () => {
            window.removeEventListener('scroll', handleScroll)
            cleanupPoll()
        }
    }, [isMobile])

    if (!supported || reducedMotion) {
        return <FallbackSVG />
    }

    return (
        <div className="system-flow-container">
            <Canvas 
                dpr={isMobile ? [1, 1.5] : [1, 2]} 
                performance={{ min: isMobile ? 0.5 : 0.7 }}
                frameloop={isInView ? 'always' : 'demand'}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
                
                <Suspense fallback={null}>
                    <DetailedSmall3DScene
                        systemData={systemData}
                        scrollFactor={scrollFactor}
                    />
                </Suspense>
            </Canvas>

            {/* Clean Status Display */}
            <div className="system-flow-status">
                <div className={`status-dot status-${apiStatus}`}></div>
                <div className="status-info">
                    <span className="status-text">
                        {apiStatus === 'online' ? 'SYSTEM ACTIVE' : 'CONNECTING'}
                    </span>
                    <span className="status-micro">{statusMessage}</span>
                </div>
            </div>

            {/* Simple Engineering Overlay */}
            <div className="engineering-overlay">
                <div className="spec-item">MODE: DETAILED_SMALL</div>
                <div className="spec-item">STATUS: OPERATIONAL</div>
                <div className="spec-item">SCALE: COMPACT</div>
            </div>
        </div>
    )
}

function FallbackSVG() {
    return (
        <div className="system-flow-fallback">
            <svg viewBox="0 0 100 100" width="100" height="100" opacity="0.4">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#3b82f6" strokeWidth="3" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="50" cy="50" r="10" fill="#3b82f6" opacity="0.6" />
                <circle cx="20" cy="20" r="5" fill="#3b82f6" opacity="0.5" />
                <circle cx="80" cy="20" r="5" fill="#8b5cf6" opacity="0.5" />
                <circle cx="20" cy="80" r="5" fill="#10b981" opacity="0.5" />
                <circle cx="80" cy="80" r="5" fill="#f59e0b" opacity="0.5" />
            </svg>
        </div>
    )
}

function useWebGLSupport() {
    const [supported, setSupported] = useState(true)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
            setSupported(!!gl)
        } catch (e) {
            setSupported(false)
        }
        
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mediaQuery.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mediaQuery.addEventListener('change', handler)
        
        const mobileQuery = window.matchMedia('(max-width: 768px)')
        setIsMobile(mobileQuery.matches)
        const mobileHandler = (e) => setIsMobile(e.matches)
        mobileQuery.addEventListener('change', mobileHandler)
        
        return () => {
            mediaQuery.removeEventListener('change', handler)
            mobileQuery.removeEventListener('change', mobileHandler)
        }
    }, [])

    return { supported, reducedMotion, isMobile }
}

export default SystemFlow