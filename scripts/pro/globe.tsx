"use client"

import * as React from "react"

interface GlobeProps {
  size?: number
  dotColor?: string
  dotRadius?: number
  dotSpacing?: number
  speed?: number
  className?: string
}

function Globe({
  size = 320,
  dotColor = "oklch(78% 0.17 200)",
  dotRadius = 1.2,
  dotSpacing = 8,
  speed = 0.003,
  className,
}: GlobeProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const angleRef = React.useRef(0)
  const rafRef = React.useRef<number>(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const px = size * dpr
    canvas.width = px
    canvas.height = px
    ctx.scale(dpr, dpr)

    const R = size / 2 - 8
    const cx = size / 2
    const cy = size / 2

    // pre-compute sphere dot positions (lat/lon grid)
    const dots: [number, number][] = []
    for (let lat = -90; lat <= 90; lat += dotSpacing) {
      const latR = (lat * Math.PI) / 180
      const cosLat = Math.cos(latR)
      const lonStep = cosLat > 0.1 ? dotSpacing / cosLat : 360
      for (let lon = 0; lon < 360; lon += lonStep) {
        dots.push([latR, (lon * Math.PI) / 180])
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, size, size)
      const a = angleRef.current

      for (const [lat, lon] of dots) {
        const x3 = Math.cos(lat) * Math.cos(lon + a)
        const y3 = Math.sin(lat)
        const z3 = Math.cos(lat) * Math.sin(lon + a)

        if (z3 < -0.1) continue // back-face cull

        const sx = cx + x3 * R
        const sy = cy - y3 * R

        // depth-based opacity
        const depth = (z3 + 1) / 2
        ctx!.beginPath()
        ctx!.arc(sx, sy, dotRadius, 0, Math.PI * 2)
        ctx!.fillStyle = dotColor.replace(")", ` / ${0.15 + depth * 0.7})`)
        ctx!.fill()
      }

      angleRef.current += speed
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [size, dotColor, dotRadius, dotSpacing, speed])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={className}
    />
  )
}

export { Globe }
