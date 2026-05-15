"use client"

import * as React from "react"

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number
  glare?: boolean
  scale?: number
}

function TiltCard({
  className,
  children,
  intensity = 12,
  glare = true,
  scale = 1.02,
  style,
  ...props
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const glareRef = React.useRef<HTMLDivElement>(null)
  const raf = React.useRef<number>(0)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        const rotateX = -y * intensity
        const rotateY = x * intensity
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
        if (glareRef.current) {
          const angle = Math.atan2(y, x) * (180 / Math.PI) + 90
          const dist = Math.sqrt(x * x + y * y)
          glareRef.current.style.opacity = String(dist * 0.4)
          glareRef.current.style.transform = `rotate(${angle}deg)`
        }
      })
    },
    [intensity, scale]
  )

  const handleMouseLeave = React.useCallback(() => {
    cancelAnimationFrame(raf.current)
    const el = ref.current
    if (!el) return
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    if (glareRef.current) glareRef.current.style.opacity = "0"
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
        willChange: "transform",
        ...style,
      }}
      className={[
        "relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden cursor-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, var(--color-glass-shine) 0%, transparent 60%)",
            opacity: 0,
            pointerEvents: "none",
            transformOrigin: "center center",
            borderRadius: "inherit",
            transition: "opacity 0.1s ease-out",
            zIndex: 1,
          }}
        />
      )}
      <div style={{ transform: "translateZ(20px)", position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}

export { TiltCard }
