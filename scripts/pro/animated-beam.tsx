"use client"

import * as React from "react"

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement | null>
  fromRef: React.RefObject<HTMLElement | null>
  toRef: React.RefObject<HTMLElement | null>
  color?: string
  duration?: number
  delay?: number
  curvature?: number
  reverse?: boolean
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  className?: string
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  color = "oklch(78% 0.17 200)",
  duration = 3,
  delay = 0,
  curvature = 0,
  reverse = false,
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "oklch(78% 0.17 200)",
  gradientStopColor = "oklch(78% 0.17 280)",
  className,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = React.useId().replace(/:/g, "")
  const [pathD, setPathD] = React.useState("")
  const [svgDims, setSvgDims] = React.useState({ w: 0, h: 0 })

  React.useEffect(() => {
    function update() {
      const container = containerRef.current
      const from = fromRef.current
      const to = toRef.current
      if (!container || !from || !to) return

      const cr = container.getBoundingClientRect()
      const fr = from.getBoundingClientRect()
      const tr = to.getBoundingClientRect()

      const sx = fr.left - cr.left + fr.width / 2 + startXOffset
      const sy = fr.top - cr.top + fr.height / 2 + startYOffset
      const ex = tr.left - cr.left + tr.width / 2 + endXOffset
      const ey = tr.top - cr.top + tr.height / 2 + endYOffset

      const mx = (sx + ex) / 2
      const my = (sy + ey) / 2
      const dx = ex - sx
      const len = Math.sqrt(dx * dx + (ey - sy) ** 2)
      const cpx = mx - (curvature / len) * (ey - sy)
      const cpy = my + (curvature / len) * dx

      setSvgDims({ w: cr.width, h: cr.height })
      setPathD(`M ${sx},${sy} Q ${cpx},${cpy} ${ex},${ey}`)
    }

    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  if (!pathD) return null

  const gradId = `beam-grad-${id}`
  const animId = `beam-anim-${id}`

  return (
    <svg
      className={["pointer-events-none absolute inset-0 overflow-visible", className].filter(Boolean).join(" ")}
      width={svgDims.w}
      height={svgDims.h}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={reverse ? gradientStopColor : gradientStartColor} stopOpacity="0" />
          <stop offset="20%" stopColor={reverse ? gradientStopColor : gradientStartColor} stopOpacity="1" />
          <stop offset="80%" stopColor={reverse ? gradientStartColor : gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={reverse ? gradientStartColor : gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* static track */}
      <path d={pathD} stroke={color} strokeWidth={pathWidth} fill="none" strokeOpacity={pathOpacity} />
      {/* animated beam */}
      <path d={pathD} stroke={`url(#${gradId})`} strokeWidth={pathWidth} fill="none">
        <style>{`
          @keyframes ${animId} {
            0%   { stroke-dashoffset: 1; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
        <animate
          attributeName="stroke-dashoffset"
          from={reverse ? "0" : "1"}
          to={reverse ? "1" : "0"}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="0 1;0.3 0.7;0 1"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

export { AnimatedBeam }
