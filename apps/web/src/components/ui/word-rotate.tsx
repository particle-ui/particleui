"use client"

import * as React from "react"

interface WordRotateProps {
  words: string[]
  interval?: number
  className?: string
  staticPrefix?: string
  staticSuffix?: string
}

function WordRotate({
  words,
  interval = 2500,
  className,
  staticPrefix,
  staticSuffix,
}: WordRotateProps) {
  const [index, setIndex] = React.useState(0)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setVisible(true)
      }, 300)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className={className}>
      {staticPrefix}
      <span
        style={{
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          color: "oklch(78% 0.17 200)",
        }}
      >
        {words[index]}
      </span>
      {staticSuffix}
    </span>
  )
}

export { WordRotate }
