"use client"

import * as React from "react"

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: number
}

function GlitchText({ text, className, intensity = 1 }: GlitchTextProps) {
  const px = (n: number) => `${n * intensity}px`

  return (
    <>
      <style>{`
        @keyframes glitch-clip-1 {
          0%, 100% { clip-path: inset(0 0 90% 0); transform: translate(${px(2)}, ${px(-1)}); }
          20% { clip-path: inset(30% 0 50% 0); transform: translate(${px(-3)}, ${px(2)}); }
          40% { clip-path: inset(60% 0 20% 0); transform: translate(${px(3)}, ${px(-2)}); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(${px(-2)}, ${px(1)}); }
          80% { clip-path: inset(10% 0 75% 0); transform: translate(${px(1)}, ${px(3)}); }
        }
        @keyframes glitch-clip-2 {
          0%, 100% { clip-path: inset(70% 0 0 0); transform: translate(${px(-2)}, ${px(1)}); }
          25% { clip-path: inset(40% 0 40% 0); transform: translate(${px(3)}, ${px(-3)}); }
          50% { clip-path: inset(5% 0 80% 0); transform: translate(${px(-1)}, ${px(2)}); }
          75% { clip-path: inset(55% 0 25% 0); transform: translate(${px(2)}, ${px(-1)}); }
        }
        @keyframes glitch-jitter {
          0%, 90%, 100% { transform: none; }
          92% { transform: translate(${px(1)}, 0); }
          94% { transform: translate(${px(-1)}, ${px(1)}); }
          96% { transform: translate(${px(2)}, 0); }
          98% { transform: translate(0, ${px(-1)}); }
        }
        .glitch-layer-1 {
          animation: glitch-clip-1 2.5s infinite linear, glitch-jitter 4s infinite;
          color: oklch(65% 0.25 25);
        }
        .glitch-layer-2 {
          animation: glitch-clip-2 3.1s infinite linear, glitch-jitter 5s infinite 0.3s;
          color: oklch(80% 0.2 195);
        }
      `}</style>
      <span
        className={["relative inline-block text-[var(--color-text-1)]", className]
          .filter(Boolean)
          .join(" ")}
        aria-label={text}
      >
        <span>{text}</span>
        <span
          className="glitch-layer-1 pointer-events-none select-none"
          aria-hidden
          style={{ position: "absolute", inset: 0, overflow: "hidden", mixBlendMode: "screen" }}
        >
          {text}
        </span>
        <span
          className="glitch-layer-2 pointer-events-none select-none"
          aria-hidden
          style={{ position: "absolute", inset: 0, overflow: "hidden", mixBlendMode: "screen" }}
        >
          {text}
        </span>
      </span>
    </>
  )
}

export { GlitchText }
export default GlitchText
