"use client"

import * as React from "react"

interface MeteorsProps {
  count?: number
  className?: string
  color?: string
}

function Meteors({ count = 18, className, color = "var(--color-accent)" }: MeteorsProps) {
  const meteors = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: Math.random() * 8,
        duration: 2 + Math.random() * 4,
        left: Math.random() * 100,
        size: 1 + Math.random() * 1.5,
        length: 80 + Math.random() * 120,
      })),
    [count]
  )

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          style={{
            position: "absolute",
            top: "-10%",
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.length}px`,
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            borderRadius: "9999px",
            opacity: 0,
            transform: "rotate(215deg)",
            animation: `meteor ${m.duration}s ${m.delay}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes meteor {
          0%   { opacity: 0; transform: rotate(215deg) translateX(0); }
          5%   { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; transform: rotate(215deg) translateX(calc(100vh + 200px)); }
        }
      `}</style>
    </div>
  )
}

export { Meteors }
