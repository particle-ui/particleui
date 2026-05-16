"use client"

import * as React from "react"

type RevealDirection = "up" | "down" | "left" | "right" | "none"

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: RevealDirection
  distance?: number
  duration?: number
  delay?: number
  once?: boolean
}

const directionMap: Record<RevealDirection, string> = {
  up:    "translateY(VAR)",
  down:  "translateY(-VAR)",
  left:  "translateX(VAR)",
  right: "translateX(-VAR)",
  none:  "translateY(0)",
}

function ScrollReveal({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = 600,
  delay = 0,
  once = true,
  style,
  ...props
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setRevealed(false)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const hiddenTransform = directionMap[direction].replace("VAR", `${distance}px`)

  return (
    <div
      ref={ref}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translate(0)" : hiddenTransform,
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

export { ScrollReveal }
