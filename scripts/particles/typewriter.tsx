"use client"

import * as React from "react"

interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
  cursorClassName?: string
  loop?: boolean
}

function Typewriter({
  words,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseMs = 1800,
  className,
  cursorClassName,
  loop = true,
}: TypewriterProps) {
  const [displayed, setDisplayed] = React.useState("")
  const [wordIdx, setWordIdx] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    const current = words[wordIdx % words.length]

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false)
        if (loop || wordIdx < words.length - 1) setIsDeleting(true)
      }, pauseMs)
      return () => clearTimeout(t)
    }

    const t = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayed(current.slice(0, displayed.length + 1))
          if (displayed.length + 1 === current.length) setIsPaused(true)
        } else {
          setDisplayed(current.slice(0, displayed.length - 1))
          if (displayed.length === 0) {
            setIsDeleting(false)
            setWordIdx((i) => (i + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )
    return () => clearTimeout(t)
  }, [displayed, isDeleting, isPaused, wordIdx, words, typingSpeed, deletingSpeed, pauseMs, loop])

  return (
    <span className={className}>
      {displayed}
      <span
        aria-hidden
        className={[
          "inline-block w-0.5 h-[1em] ml-0.5 align-middle",
          "bg-[var(--color-accent)]",
          "animate-[typewriter-blink_0.75s_step-end_infinite]",
          cursorClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </span>
  )
}

export { Typewriter }
