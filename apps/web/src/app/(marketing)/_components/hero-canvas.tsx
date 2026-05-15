"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; a: number; ta: number
}

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef(0)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    const isDark = resolvedTheme !== "light"
    const rgb = isDark ? "212,204,196" : "40,32,24"
    let W = 0, H = 0, particles: Particle[] = []

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      particles = Array.from({ length: 90 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.1,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.6 + 0.1,
        ta: Math.random() * 0.6 + 0.1,
      }))
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener("mousemove", onMove)

    let paused = false
    const onVis = () => { paused = document.hidden }
    document.addEventListener("visibilitychange", onVis)

    const CONNECT = 130
    const MOUSE_PULL = 160

    const draw = () => {
      if (!paused) {
        ctx.clearRect(0, 0, W, H)

        for (const p of particles) {
          // Mouse attraction
          const dx = mouse.current.x - p.x
          const dy = mouse.current.y - p.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MOUSE_PULL) {
            const force = (1 - d / MOUSE_PULL) * 0.012
            p.vx += dx * force
            p.vy += dy * force
          }

          p.vx *= 0.99; p.vy *= 0.99
          p.x += p.vx; p.y += p.vy

          // Wrap edges
          if (p.x < -10) p.x = W + 10
          if (p.x > W + 10) p.x = -10
          if (p.y < -10) p.y = H + 10
          if (p.y > H + 10) p.y = -10

          // Fade toward target opacity
          p.a += (p.ta - p.a) * 0.02

          // Particle glow
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
          grd.addColorStop(0, `rgba(${rgb},${p.a})`)
          grd.addColorStop(1, `rgba(${rgb},0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()

          // Core dot
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb},${p.a * 1.5})`
          ctx.fill()
        }

        // Connect lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < CONNECT) {
              const alpha = (1 - d / CONNECT) * 0.12
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(${rgb},${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }
      raf.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
