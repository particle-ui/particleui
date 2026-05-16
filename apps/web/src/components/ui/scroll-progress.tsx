"use client"

import * as React from "react"

interface ScrollProgressProps {
  className?: string
  color?: string
}

function ScrollProgress({
  className,
  color = "var(--color-accent)",
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      className={[
        "fixed top-0 left-0 right-0 z-[9999] h-[3px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ background: "transparent" }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: color,
          boxShadow: `0 0 8px ${color}`,
          transition: "width 0.05s linear",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  )
}

export { ScrollProgress }
export default ScrollProgress
