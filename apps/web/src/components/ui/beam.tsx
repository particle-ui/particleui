"use client"

import * as React from "react"

interface BeamProps {
  width?: string | number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
}

function Beam({
  width = "100%",
  duration = 3,
  delay = 0,
  colorFrom = "var(--color-accent)",
  colorTo = "transparent",
  className,
}: BeamProps) {
  return (
    <div
      className={["relative h-px overflow-hidden", className].filter(Boolean).join(" ")}
      style={{ width }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, transparent 0%, ${colorFrom} 50%, ${colorTo} 100%)`,
          animation: `beam-slide ${duration}s ${delay}s ease-in-out infinite`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent, oklch(from var(--color-accent) l c h / 0.1), transparent)`,
        }}
      />
      <style>{`
        @keyframes beam-slide {
          0%   { transform: translateX(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export { Beam }
