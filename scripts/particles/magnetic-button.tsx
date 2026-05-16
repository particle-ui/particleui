"use client"

import * as React from "react"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
}

function MagneticButton({ children, className, strength = 0.35, style, ...props }: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [active, setActive] = React.useState(false)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      })
    },
    [strength]
  )

  const handleMouseLeave = React.useCallback(() => {
    setOffset({ x: 0, y: 0 })
    setActive(false)
  }, [])

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: active
          ? "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)"
          : "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      className={[
        "relative cursor-pointer select-none rounded-lg px-5 py-2.5 text-sm font-semibold",
        "bg-[var(--color-surface-1)] text-[var(--color-text-1)] border border-[var(--color-border)]",
        "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  )
}

export { MagneticButton }
