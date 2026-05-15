"use client"

import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface Particle {
  x: number; y: number; vx: number; vy: number
  color: string; size: number; life: number; rotation: number; rotationSpeed: number
}

const COLORS = [
  "oklch(97% 0.005 80)", "oklch(86% 0 0)", "oklch(76% 0 0)",
  "oklch(62% 0 0)", "oklch(50% 0 0)", "oklch(96% 0.01 80)",
]

function ConfettiButton({ onClick, children, ...props }: ButtonProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const particles = React.useRef<Particle[]>([])
  const raf = React.useRef<number>(0)

  const shoot = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    const btn = btnRef.current
    const canvas = canvasRef.current
    if (!btn || !canvas) return

    const rect = btn.getBoundingClientRect()
    canvas.style.left = `${rect.left + rect.width / 2 - 150}px`
    canvas.style.top = `${rect.top + rect.height / 2 - 150}px`
    canvas.width = 300
    canvas.height = 300

    particles.current = Array.from({ length: 60 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 3 + Math.random() * 6
      return {
        x: 150, y: 150,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 6,
        life: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
      }
    })

    const ctx = canvas.getContext("2d")!
    cancelAnimationFrame(raf.current)

    const draw = () => {
      ctx.clearRect(0, 0, 300, 300)
      particles.current = particles.current.filter((p) => p.life > 0)
      for (const p of particles.current) {
        ctx.save()
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.25
        p.vx *= 0.98
        p.life -= 0.016
        p.rotation += p.rotationSpeed
      }
      if (particles.current.length > 0) raf.current = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, 300, 300)
    }
    raf.current = requestAnimationFrame(draw)
  }, [onClick])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          width: 300,
          height: 300,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <Button ref={btnRef} onClick={shoot} {...props}>
        {children}
      </Button>
    </>
  )
}

export { ConfettiButton }
