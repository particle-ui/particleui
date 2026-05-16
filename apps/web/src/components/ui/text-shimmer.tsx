"use client"

import * as React from "react"

interface TextShimmerProps {
  text: string
  className?: string
  duration?: number
}

function TextShimmer({
  text,
  className,
  duration = 2000,
}: TextShimmerProps) {
  return (
    <>
      <style>{`
        @keyframes text-shimmer-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .text-shimmer-animate {
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer-sweep var(--shimmer-duration, 2000ms) linear infinite;
        }
      `}</style>
      <span
        className={[
          "text-shimmer-animate inline-block",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          ["--shimmer-duration" as string]: `${duration}ms`,
          backgroundImage:
            "linear-gradient(90deg, var(--color-text-2) 0%, var(--color-text-1) 20%, var(--color-accent) 40%, var(--color-text-1) 60%, var(--color-text-2) 80%, var(--color-text-2) 100%)",
        }}
      >
        {text}
      </span>
    </>
  )
}

export { TextShimmer }
export default TextShimmer
