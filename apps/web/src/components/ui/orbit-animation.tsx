"use client"

import * as React from "react"

interface OrbitItem {
  content: React.ReactNode
  radius?: number
  duration?: number
  offset?: number
  reverse?: boolean
}

interface OrbitAnimationProps {
  center?: React.ReactNode
  items: OrbitItem[]
  size?: number
  showRings?: boolean
  className?: string
}

function OrbitAnimation({
  center,
  items,
  size = 300,
  showRings = true,
  className,
}: OrbitAnimationProps) {
  const radii = items.map((item, i) => item.radius ?? 60 + i * 48)
  const uniqueRadii = [...new Set(radii)]

  return (
    <div
      className={["relative flex items-center justify-center select-none", className]
        .filter(Boolean)
        .join(" ")}
      style={{ width: size, height: size }}
    >
      {/* Rings */}
      {showRings &&
        uniqueRadii.map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-white/[0.07]"
            style={{ width: r * 2, height: r * 2 }}
          />
        ))}

      {/* Center node */}
      {center && (
        <div className="relative z-10 flex items-center justify-center rounded-full">
          {center}
        </div>
      )}

      {/* Orbiting items */}
      {items.map((item, i) => {
        const r = radii[i]
        const dur = item.duration ?? 10 + i * 4
        const off = item.offset ?? (i * 360) / items.length
        const dir = item.reverse ? "reverse" : "normal"

        return (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: `particle-orbit ${dur}s linear infinite ${dir}`,
              animationDelay: `${-(off / 360) * dur}s`,
            }}
          >
            <div
              style={{ transform: `translateY(-${r}px)` }}
              className="flex items-center justify-center"
            >
              {item.content}
            </div>
          </div>
        )
      })}

      <style>{`
        @keyframes particle-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export { OrbitAnimation }
