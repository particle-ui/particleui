"use client"

import * as React from "react"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const maskRef = React.useRef<HTMLSpanElement>(null)
  const [revealed, setRevealed] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes text-reveal-slide {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0% 0 0); }
        }
        .text-reveal-animate {
          animation: text-reveal-slide 0.7s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }
      `}</style>
      <span
        ref={ref}
        className={["relative inline-block overflow-hidden", className]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          aria-hidden
          style={{ visibility: "hidden", whiteSpace: "pre" }}
        >
          {text}
        </span>
        <span
          ref={maskRef}
          aria-label={text}
          className={revealed ? "text-reveal-animate" : ""}
          style={{
            position: "absolute",
            inset: 0,
            clipPath: "inset(0 100% 0 0)",
            animationDelay: revealed ? `${delay}ms` : "0ms",
            whiteSpace: "pre",
          }}
        >
          {text}
        </span>
      </span>
    </>
  )
}

export { TextReveal }
export default TextReveal
