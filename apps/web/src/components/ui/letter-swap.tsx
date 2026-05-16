"use client"

import * as React from "react"

interface LetterSwapProps {
  text: string
  className?: string
  speed?: number
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

function LetterSwap({ text, className, speed = 50 }: LetterSwapProps) {
  const [displayed, setDisplayed] = React.useState(text.split(""))
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])

  const scramble = React.useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    const letters = text.split("")
    const iterations = 8

    letters.forEach((char, i) => {
      if (char === " ") return
      for (let iter = 0; iter < iterations; iter++) {
        const t = setTimeout(
          () => {
            setDisplayed((prev) => {
              const next = [...prev]
              if (iter < iterations - 1) {
                next[i] = CHARS[Math.floor(Math.random() * CHARS.length)]
              } else {
                next[i] = char
              }
              return next
            })
          },
          i * speed + iter * (speed * 0.6)
        )
        timers.current.push(t)
      }
    })
  }, [text, speed])

  const reset = React.useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setDisplayed(text.split(""))
  }, [text])

  React.useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  return (
    <span
      className={[
        "inline-block cursor-default select-none font-mono text-[var(--color-text-1)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      aria-label={text}
    >
      {displayed.map((char, i) => (
        <span key={i} style={{ display: "inline-block", minWidth: char === " " ? "0.35em" : undefined }}>
          {char}
        </span>
      ))}
    </span>
  )
}

export { LetterSwap }
export default LetterSwap
