"use client"

import * as React from "react"

interface TrailPoint {
  x: number
  y: number
  t: number
}

interface CursorTrailProps {
  color?: string
  size?: number
  length?: number
  fade?: number
  className?: string
}

function CursorTrail({
  color = "oklch(78% 0.17 200)",
  size = 6,
  length = 24,
  fade = 400,
  className,
}: CursorTrailProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const trail = React.useRef<TrailPoint[]>([])
  const rafRef = React.useRef<number>(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0
    let H = 0

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = W
      canvas!.height = H
    }
    resize()
    window.addEventListener("resize", resize)

    function onMouseMove(e: MouseEvent) {
      trail.current.push({ x: e.clientX, y: e.clientY, t: Date.now() })
      if (trail.current.length > length) trail.current.shift()
    }
    window.addEventListener("mousemove", onMouseMove)

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      const now = Date.now()

      for (let i = 1; i < trail.current.length; i++) {
        const p = trail.current[i]
        const age = now - p.t
        if (age > fade) continue

        const alpha = (1 - age / fade) * (i / trail.current.length)
        const r = size * (i / trail.current.length)

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx!.fillStyle = color.replace(")", ` / ${alpha.toFixed(2)})`)
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [color, size, length, fade])

  return (
    <canvas
      ref={canvasRef}
      className={["pointer-events-none fixed inset-0 z-[9999]", className].filter(Boolean).join(" ")}
      aria-hidden
    />
  )
}

export { CursorTrail }
