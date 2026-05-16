"use client"

import * as React from "react"

type AnimateInVariant =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "rotate"

interface AnimateInProps {
  children: React.ReactNode
  variant?: AnimateInVariant
  delay?: number
  duration?: number
  className?: string
}

const KEYFRAMES: Record<AnimateInVariant, string> = {
  fade: `
    @keyframes anim-in-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  "slide-up": `
    @keyframes anim-in-slide-up {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
  "slide-down": `
    @keyframes anim-in-slide-down {
      from { opacity: 0; transform: translateY(-28px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
  "slide-left": `
    @keyframes anim-in-slide-left {
      from { opacity: 0; transform: translateX(28px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `,
  "slide-right": `
    @keyframes anim-in-slide-right {
      from { opacity: 0; transform: translateX(-28px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `,
  scale: `
    @keyframes anim-in-scale {
      from { opacity: 0; transform: scale(0.88); }
      to { opacity: 1; transform: scale(1); }
    }
  `,
  rotate: `
    @keyframes anim-in-rotate {
      from { opacity: 0; transform: rotate(-8deg) scale(0.92); }
      to { opacity: 1; transform: rotate(0deg) scale(1); }
    }
  `,
}

const ANIMATION_NAME: Record<AnimateInVariant, string> = {
  fade: "anim-in-fade",
  "slide-up": "anim-in-slide-up",
  "slide-down": "anim-in-slide-down",
  "slide-left": "anim-in-slide-left",
  "slide-right": "anim-in-slide-right",
  scale: "anim-in-scale",
  rotate: "anim-in-rotate",
}

function AnimateIn({
  children,
  variant = "fade",
  delay = 0,
  duration = 500,
  className,
}: AnimateInProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const animName = ANIMATION_NAME[variant]

  return (
    <>
      <style>{Object.values(KEYFRAMES).join("\n")}</style>
      <div
        ref={ref}
        className={className}
        style={
          triggered
            ? {
                animation: `${animName} ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`,
              }
            : { opacity: 0 }
        }
      >
        {children}
      </div>
    </>
  )
}

export { AnimateIn }
export default AnimateIn
