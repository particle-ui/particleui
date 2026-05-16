"use client"

import * as React from "react"

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "accent" | "ghost"
}

function LiquidButton({
  children,
  className,
  variant = "default",
  style,
  ...props
}: LiquidButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null)
  const [hovered, setHovered] = React.useState(false)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    },
    []
  )

  const variantStyles: Record<string, { base: string; blob: string }> = {
    default: {
      base: "bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-1)]",
      blob: "oklch(100% 0 0 / 0.08)",
    },
    accent: {
      base: "bg-[var(--color-accent)] text-[var(--color-bg)]",
      blob: "oklch(100% 0 0 / 0.25)",
    },
    ghost: {
      base: "bg-transparent border border-[var(--color-border)] text-[var(--color-text-1)]",
      blob: "var(--color-accent)",
    },
  }

  const v = variantStyles[variant] ?? variantStyles.default

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setPos(null)
      }}
      className={[
        "relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-medium",
        "transition-transform duration-150 active:scale-[0.97]",
        v.base,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...props}
    >
      {hovered && pos && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            width: "250%",
            aspectRatio: "1",
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle closest-side, ${v.blob}, transparent)`,
            pointerEvents: "none",
            transition: "left 0.08s ease-out, top 0.08s ease-out",
          }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  )
}

export { LiquidButton }
export default LiquidButton
