"use client"

import * as React from "react"

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode
  back: React.ReactNode
  height?: number | string
  direction?: "horizontal" | "vertical"
  trigger?: "hover" | "click"
}

function FlipCard({
  front,
  back,
  height = 240,
  direction = "horizontal",
  trigger = "hover",
  className,
  style,
  ...props
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false)
  const rotateAxis = direction === "horizontal" ? "rotateY" : "rotateX"

  const hoverProps =
    trigger === "hover"
      ? { onMouseEnter: () => setFlipped(true), onMouseLeave: () => setFlipped(false) }
      : { onClick: () => setFlipped((f) => !f) }

  return (
    <div
      {...hoverProps}
      style={{ perspective: "1200px", height, ...style }}
      className={["relative w-full cursor-pointer select-none", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: flipped ? `${rotateAxis}(180deg)` : `${rotateAxis}(0deg)`,
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden"
        >
          {front}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: `${rotateAxis}(180deg)`,
          }}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-hidden"
        >
          {back}
        </div>
      </div>
    </div>
  )
}

export { FlipCard }
