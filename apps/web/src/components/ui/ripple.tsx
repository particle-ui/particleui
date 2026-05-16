"use client"

import * as React from "react"

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string
}

interface RippleItem {
  id: number
  x: number
  y: number
  size: number
}

function RippleButton({
  children,
  className,
  rippleColor = "oklch(78% 0.17 200 / 0.35)",
  onClick,
  style,
  ...props
}: RippleButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = React.useState<RippleItem[]>([])
  const counter = React.useRef(0)

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      const id = ++counter.current

      setRipples((prev) => [...prev, { id, x, y, size }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
      onClick?.(e)
    },
    [onClick]
  )

  return (
    <button
      ref={ref}
      onClick={handleClick}
      style={{ position: "relative", overflow: "hidden", ...style }}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer select-none",
        "bg-[var(--color-accent)] text-[var(--color-bg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            borderRadius: "50%",
            background: rippleColor,
            animation: "ripple-expand 0.6s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-expand {
          from { transform: scale(0); opacity: 1; }
          to   { transform: scale(1); opacity: 0; }
        }
      `}</style>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  )
}

export { RippleButton }
