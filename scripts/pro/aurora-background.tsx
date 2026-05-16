"use client"

import * as React from "react"

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[]
  speed?: "slow" | "medium" | "fast"
  blur?: number
}

const DURATIONS = { slow: "18s", medium: "10s", fast: "5s" }

function AuroraBackground({
  className,
  children,
  colors = [
    "oklch(78% 0.17 200)",
    "oklch(65% 0.25 285)",
    "oklch(72% 0.2 220)",
    "oklch(60% 0.22 300)",
  ],
  speed = "medium",
  blur = 80,
  style,
  ...props
}: AuroraBackgroundProps) {
  const dur = DURATIONS[speed]

  return (
    <div
      className={["relative overflow-hidden", className].filter(Boolean).join(" ")}
      style={style}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {colors.map((color, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: color,
              width: "65%",
              height: "65%",
              top: `${(i * 28) % 55}%`,
              left: `${(i * 35) % 55}%`,
              filter: `blur(${blur}px)`,
              animation: `aurora-blob-${i % 3} ${dur} ease-in-out infinite`,
              animationDelay: `${i * (parseFloat(dur) / colors.length)}s`,
            }}
          />
        ))}
        <style>{`
          @keyframes aurora-blob-0 {
            0%,100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(8%,-12%) scale(1.08); }
            66% { transform: translate(-6%,8%) scale(0.95); }
          }
          @keyframes aurora-blob-1 {
            0%,100% { transform: translate(0,0) scale(1.05); }
            33% { transform: translate(-10%,8%) scale(0.94); }
            66% { transform: translate(12%,-10%) scale(1.1); }
          }
          @keyframes aurora-blob-2 {
            0%,100% { transform: translate(0,0) scale(0.92); }
            33% { transform: translate(6%,10%) scale(1.08); }
            66% { transform: translate(-8%,-8%) scale(1); }
          }
        `}</style>
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}

export { AuroraBackground }
