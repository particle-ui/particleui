"use client"

import * as React from "react"

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  gap?: number
  className?: string
  repeat?: number
}

function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  gap = 16,
  className,
  repeat = 4,
}: MarqueeProps) {
  const duration = `${(1 / speed) * 1000}s`

  return (
    <div
      className={["flex overflow-hidden [--gap:theme(spacing.4)]", className].filter(Boolean).join(" ")}
      style={{ "--marquee-gap": `${gap}px` } as React.CSSProperties}
    >
      <div
        className={[
          "flex min-w-full shrink-0 items-center gap-[var(--marquee-gap)]",
          pauseOnHover && "hover:[animation-play-state:paused]",
          direction === "left"
            ? "animate-[marquee-left_var(--marquee-duration)_linear_infinite]"
            : "animate-[marquee-right_var(--marquee-duration)_linear_infinite]",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {Array.from({ length: repeat }, (_, i) => (
          <React.Fragment key={i}>{children}</React.Fragment>
        ))}
      </div>
    </div>
  )
}

export { Marquee }
