"use client"

import { useRef, useEffect } from "react"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced-motion preference — skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Add hidden class only in JS — content stays visible for SSR/bots/no-JS
    el.classList.add("reveal-hidden")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-hidden")
          if (delay) el.style.animationDelay = `${delay}ms`
          el.classList.add("reveal-visible")
          observer.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
