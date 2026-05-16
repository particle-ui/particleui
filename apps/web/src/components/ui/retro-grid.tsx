import * as React from "react"

interface RetroGridProps {
  opacity?: number
  color?: string
  className?: string
}

function RetroGrid({
  opacity = 0.4,
  color = "var(--color-border)",
  className,
}: RetroGridProps) {
  return (
    <>
      <style>{`
        @keyframes retro-grid-scroll {
          0% { transform: perspective(500px) rotateX(65deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(65deg) translateY(60px); }
        }
        .retro-grid-lines {
          animation: retro-grid-scroll 3s linear infinite;
        }
      `}</style>
      <div
        className={[
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden
        style={{ opacity }}
      >
        <div
          className="retro-grid-lines"
          style={{
            position: "absolute",
            inset: "-100% -50%",
            backgroundImage: `
              linear-gradient(${color} 1px, transparent 1px),
              linear-gradient(90deg, ${color} 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(65deg) translateY(0)",
            transformOrigin: "50% 0%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, var(--color-bg, #0a0a0a), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "20%",
            background: "linear-gradient(to bottom, var(--color-bg, #0a0a0a), transparent)",
          }}
        />
      </div>
    </>
  )
}

export { RetroGrid }
export default RetroGrid
