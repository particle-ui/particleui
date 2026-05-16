"use client"

import * as React from "react"

interface BlurFadeProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

function BlurFade({
  children,
  delay = 0,
  duration = 600,
  className,
}: BlurFadeProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        filter: visible ? "blur(0px)" : "blur(8px)",
        opacity: visible ? 1 : 0,
        transition: `filter ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: "filter, opacity",
      }}
    >
      {children}
    </div>
  )
}

export { BlurFade }
export default BlurFade
