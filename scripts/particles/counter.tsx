"use client"

import * as React from "react"

interface CounterProps {
  from?: number
  to: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  formatter?: (n: number) => string
  easing?: (t: number) => number
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function Counter({
  from = 0,
  to,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  formatter,
  easing = easeOutExpo,
}: CounterProps) {
  const [value, setValue] = React.useState(from)
  const startRef = React.useRef<number | null>(null)
  const rafRef = React.useRef<number>(0)
  const elRef = React.useRef<HTMLSpanElement>(null)
  const started = React.useRef(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const animate = (ts: number) => {
            if (!startRef.current) startRef.current = ts
            const elapsed = ts - startRef.current
            const progress = Math.min(elapsed / duration, 1)
            const easedProgress = easing(progress)
            setValue(from + (to - from) * easedProgress)
            if (progress < 1) rafRef.current = requestAnimationFrame(animate)
          }
          rafRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.4 }
    )
    if (elRef.current) observer.observe(elRef.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [from, to, duration, easing])

  const display = formatter
    ? formatter(value)
    : value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })

  return (
    <span ref={elRef} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}

export { Counter }
