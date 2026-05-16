"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { GlowButton } from "@/components/ui/glow-button"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

interface CTA {
  label: string
  href: string
  variant?: "default" | "electric" | "outline"
}

interface ParticleHeroProps {
  headline: React.ReactNode
  subtext?: string
  cta?: CTA[]
  particleCount?: number
  particleColor?: "electric" | "particle" | string
  speed?: "slow" | "medium" | "fast"
  connectLines?: boolean
  className?: string
}

const SPEEDS = { slow: 0.3, medium: 0.6, fast: 1.2 }
const CONNECT_DIST = 120

export function ParticleHero({
  headline,
  subtext,
  cta = [],
  particleCount = 80,
  particleColor = "electric",
  speed = "medium",
  connectLines = true,
  className,
}: ParticleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  const resolveColor = (color: string) => {
    if (color === "electric") return "oklch(68% 0.27 205)"
    if (color === "particle") return "oklch(52% 0.24 265)"
    return color
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const spd = SPEEDS[speed]
    const color = resolveColor(particleColor)

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * spd,
      vy: (Math.random() - 0.5) * spd,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }))

    let paused = false
    const onVisibility = () => { paused = document.hidden }
    document.addEventListener("visibilitychange", onVisibility)

    const draw = () => {
      if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = color.replace(")", ` / ${p.opacity})`)
          ctx.fill()
        }

        if (connectLines) {
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < CONNECT_DIST) {
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = color.replace(")", ` / ${0.15 * (1 - dist / CONNECT_DIST)})`)
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [particleCount, particleColor, speed, connectLines])

  return (
    <section
      className={cn(
        "relative flex min-h-svh items-center justify-center overflow-hidden bg-particle-950",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          {headline}
        </h1>
        {subtext && (
          <p className="mt-6 text-lg text-particle-300 max-w-2xl mx-auto">
            {subtext}
          </p>
        )}
        {cta.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {cta.map((c) => (
              <a key={c.href} href={c.href}>
                <GlowButton variant={c.variant ?? "default"} size="lg">
                  {c.label}
                </GlowButton>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

