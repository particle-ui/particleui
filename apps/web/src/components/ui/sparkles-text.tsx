"use client"

import * as React from "react"

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  color: string
}

interface SparklesTextProps {
  children: React.ReactNode
  className?: string
  count?: number
}

const SPARKLE_COLORS = [
  "var(--color-accent)",
  "#fff",
  "oklch(90% 0.15 85)",
  "oklch(85% 0.18 200)",
]

function generateSparkle(id: number): Sparkle {
  return {
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 10 + Math.random() * 14,
    delay: Math.random() * 600,
    color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
  }
}

function SparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
    >
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
    </svg>
  )
}

function SparklesText({
  children,
  className,
  count = 6,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = React.useState<Sparkle[]>(() =>
    Array.from({ length: count }, (_, i) => generateSparkle(i))
  )
  const counterRef = React.useRef(count)

  React.useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * count)
      counterRef.current += 1
      setSparkles((prev) => {
        const next = [...prev]
        next[idx] = generateSparkle(counterRef.current)
        return next
      })
    }, 400)
    return () => clearInterval(interval)
  }, [count])

  return (
    <>
      <style>{`
        @keyframes sparkle-scale {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          30% { transform: scale(1) rotate(20deg); opacity: 1; }
          70% { transform: scale(0.8) rotate(-10deg); opacity: 0.7; }
        }
        .sparkle-star {
          animation: sparkle-scale 0.8s ease-in-out forwards;
          animation-delay: var(--sparkle-delay, 0ms);
        }
      `}</style>
      <span
        className={["relative inline-block", className].filter(Boolean).join(" ")}
      >
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="sparkle-star pointer-events-none absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: "translate(-50%, -50%)",
              ["--sparkle-delay" as string]: `${s.delay}ms`,
              zIndex: 1,
            }}
          >
            <SparkleIcon size={s.size} color={s.color} />
          </span>
        ))}
        <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      </span>
    </>
  )
}

export { SparklesText }
export default SparklesText
