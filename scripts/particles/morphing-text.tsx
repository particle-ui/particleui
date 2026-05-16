"use client"

import * as React from "react"

interface MorphingTextProps {
  words: string[]
  className?: string
}

function MorphingText({ words, className }: MorphingTextProps) {
  const [index, setIndex] = React.useState(0)
  const [morphing, setMorphing] = React.useState(false)

  React.useEffect(() => {
    if (words.length < 2) return
    const interval = setInterval(() => {
      setMorphing(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setTimeout(() => setMorphing(false), 400)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [words])

  return (
    <>
      <style>{`
        @keyframes morph-blur-in {
          0% { filter: blur(12px); opacity: 0; transform: scaleX(0.92); }
          100% { filter: blur(0px); opacity: 1; transform: scaleX(1); }
        }
        @keyframes morph-blur-out {
          0% { filter: blur(0px); opacity: 1; transform: scaleX(1); }
          100% { filter: blur(12px); opacity: 0; transform: scaleX(0.92); }
        }
        .morphing-text-in {
          animation: morph-blur-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .morphing-text-out {
          animation: morph-blur-out 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
        }
      `}</style>
      <span
        className={[
          "inline-block text-[var(--color-text-1)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ minWidth: "4ch", textAlign: "center" }}
      >
        <span
          key={`${index}-${morphing ? "out" : "in"}`}
          className={morphing ? "morphing-text-out" : "morphing-text-in"}
          style={{ display: "inline-block" }}
        >
          {words[index]}
        </span>
      </span>
    </>
  )
}

export { MorphingText }
export default MorphingText
