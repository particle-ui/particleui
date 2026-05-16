import * as React from "react"

interface WaveTextProps {
  text: string
  className?: string
  duration?: number
}

function WaveText({ text, className, duration = 1.2 }: WaveTextProps) {
  const chars = text.split("")

  return (
    <>
      <style>{`
        @keyframes wave-bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-0.35em); }
          60% { transform: translateY(-0.2em); }
        }
        .wave-char {
          display: inline-block;
          animation: wave-bounce var(--wave-duration, 1.2s) ease-in-out infinite;
          animation-delay: var(--wave-delay, 0ms);
        }
      `}</style>
      <span
        className={["inline-block text-[var(--color-text-1)]", className]
          .filter(Boolean)
          .join(" ")}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            className="wave-char"
            aria-hidden={char !== " "}
            style={{
              ["--wave-duration" as string]: `${duration}s`,
              ["--wave-delay" as string]: `${(i / chars.length) * duration * 0.6}s`,
              minWidth: char === " " ? "0.35em" : undefined,
            }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </>
  )
}

export { WaveText }
export default WaveText
