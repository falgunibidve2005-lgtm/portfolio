import { useEffect, useRef, useCallback } from 'react'
import './AnimatedBackground.css'

function AnimatedBackground() {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)
    const particlesRef = useRef([])
    const orbsRef = useRef([])
    const mouseRef = useRef({ x: -1000, y: -1000 })

    const createParticles = useCallback((width, height) => {
        const count = Math.min(Math.floor((width * height) / 8000), 250)
        return Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.05,
            vy: (Math.random() - 0.5) * 0.05,
            radius: Math.random() * 1.2 + 0.2,
            opacity: Math.random() * 0.7 + 0.1,
            pulseSpeed: Math.random() * 0.05 + 0.01,
            pulsePhase: Math.random() * Math.PI * 2,
        }))
    }, [])

    const createOrbs = useCallback((width, height) => {
        const colors = [
            { r: 99, g: 102, b: 241 },   // Indigo
            { r: 6, g: 182, b: 212 },    // Cyan
            { r: 139, g: 92, b: 246 },   // Violet
        ]
        return Array.from({ length: 3 }, (_, i) => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.08,
            vy: (Math.random() - 0.5) * 0.08,
            radius: Math.random() * 300 + 200,
            color: colors[i % colors.length],
            opacity: 0.04,
            wobbleSpeed: Math.random() * 0.002 + 0.001,
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleRadius: Math.random() * 40 + 20,
        }))
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let time = 0

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            canvas.style.width = window.innerWidth + 'px'
            canvas.style.height = window.innerHeight + 'px'
            ctx.scale(dpr, dpr)
            particlesRef.current = createParticles(window.innerWidth, window.innerHeight)
            orbsRef.current = createOrbs(window.innerWidth, window.innerHeight)
        }

        resize()
        window.addEventListener('resize', resize)

        const handleMouse = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', handleMouse, { passive: true })

        const animate = () => {
            const w = window.innerWidth
            const h = window.innerHeight
            time += 1

            ctx.clearRect(0, 0, w, h)

            // Draw nebula orbs
            const orbs = orbsRef.current
            for (let i = 0; i < orbs.length; i++) {
                const orb = orbs[i]
                orb.wobblePhase += orb.wobbleSpeed
                orb.x += orb.vx + Math.sin(orb.wobblePhase) * 0.1
                orb.y += orb.vy + Math.cos(orb.wobblePhase * 0.7) * 0.1

                if (orb.x < -orb.radius) orb.x = w + orb.radius
                if (orb.x > w + orb.radius) orb.x = -orb.radius
                if (orb.y < -orb.radius) orb.y = h + orb.radius
                if (orb.y > h + orb.radius) orb.y = -orb.radius

                const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
                grad.addColorStop(0, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},${orb.opacity})`)
                grad.addColorStop(1, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},0)`)
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
                ctx.fill()
            }

            // Update & draw stars
            const stars = particlesRef.current
            const mx = mouseRef.current.x
            const my = mouseRef.current.y

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i]
                s.pulsePhase += s.pulseSpeed
                s.x += s.vx
                s.y += s.vy

                // Subtle parallax based on mouse
                if (mx > 0) {
                    const dx = (mx - w/2) / (w/2) * s.radius * 2
                    const dy = (my - h/2) / (h/2) * s.radius * 2
                    s.x -= dx * 0.01
                    s.y -= dy * 0.01
                }

                if (s.x < 0) s.x = w
                if (s.x > w) s.x = 0
                if (s.y < 0) s.y = h
                if (s.y > h) s.y = 0

                // Twinkling
                const alpha = s.opacity * (0.5 + Math.sin(s.pulsePhase) * 0.5)

                ctx.beginPath()
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, alpha)})`
                ctx.fill()

                // Occasional subtle connections for depth
                if (i % 8 === 0) {
                    for (let j = i + 1; j < Math.min(i + 3, stars.length); j++) {
                        const s2 = stars[j]
                        const dx = s.x - s2.x
                        const dy = s.y - s2.y
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        if (dist < 100) {
                            ctx.beginPath()
                            ctx.moveTo(s.x, s.y)
                            ctx.lineTo(s2.x, s2.y)
                            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist/100) * 0.05})`
                            ctx.lineWidth = 0.3
                            ctx.stroke()
                        }
                    }
                }
            }

            // Draw mouse glow
            if (mx > 0 && my > 0) {
                const mouseGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
                mouseGrad.addColorStop(0, 'rgba(99, 102, 241, 0.05)')
                mouseGrad.addColorStop(1, 'rgba(99, 102, 241, 0)')
                ctx.fillStyle = mouseGrad
                ctx.beginPath()
                ctx.arc(mx, my, 200, 0, Math.PI * 2)
                ctx.fill()
            }

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationRef.current)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouse)
        }
    }, [createParticles, createOrbs])

    return <canvas ref={canvasRef} className="animated-bg" />
}

export default AnimatedBackground
