"use client"

import * as React from "react"

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string
  size?: number
}

function Spotlight({
  className,
  children,
  color = "oklch(78% 0.17 200)",
  size = 400,
  style,
  ...props
}: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos(null)}
      style={{ position: "relative", overflow: "hidden", ...style }}
      className={["rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)]", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {pos && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: pos.x - size / 2,
            top: pos.y - size / 2,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color.replace(")", " / 0.12)")} 0%, transparent 65%)`,
            pointerEvents: "none",
            zIndex: 0,
            borderRadius: "50%",
            transition: "opacity 0.15s",
          }}
        />
      )}
      {pos && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: pos.x - size / 4,
            top: pos.y - size / 4,
            width: size / 2,
            height: size / 2,
            background: `radial-gradient(circle, ${color.replace(")", " / 0.06)")} 0%, transparent 70%)`,
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

export { Spotlight }
