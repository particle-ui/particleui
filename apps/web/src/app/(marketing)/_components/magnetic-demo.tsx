"use client"

import { useRef, useState } from "react"

export function MagneticDemo() {
  const ref = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({
      x: (e.clientX - cx) * 0.35,
      y: (e.clientY - cy) * 0.35,
    })
  }

  const onLeave = () => {
    setOffset({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="relative rounded-full px-7 py-3 text-sm font-medium transition-all duration-150"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        background: hovered
          ? "var(--color-accent-dim)"
          : "var(--color-surface-1)",
        border: hovered
          ? "1px solid var(--color-accent-border)"
          : "1px solid var(--color-border)",
        color: hovered ? "var(--color-accent)" : "var(--color-text-3)",
        boxShadow: hovered ? "var(--shadow-glow-sm)" : "none",
      }}
    >
      Magnetic Button
    </button>
  )
}
