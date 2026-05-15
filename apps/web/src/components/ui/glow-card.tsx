"use client"

import * as React from "react"

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string
  glowSize?: number
  glowOpacity?: number
}

function GlowCard({
  className,
  children,
  glowColor = "var(--color-accent)",
  glowSize = 300,
  glowOpacity = 0.15,
  style,
  ...props
}: GlowCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleMouseLeave = React.useCallback(() => setPos(null), [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      className={[
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] transition-colors duration-200",
        pos ? "border-[var(--color-border-hover)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {pos && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: pos.x - glowSize / 2,
            top: pos.y - glowSize / 2,
            width: glowSize,
            height: glowSize,
            background: `radial-gradient(circle, ${glowColor.replace(")", ` / ${glowOpacity})`)} 0%, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 0,
            borderRadius: "50%",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  )
}

export { GlowCard }
