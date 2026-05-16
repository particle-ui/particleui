"use client"

import * as React from "react"

interface NeonBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  color?: string
  className?: string
}

function NeonBorder({
  children,
  color = "cyan",
  className,
  style,
  ...props
}: NeonBorderProps) {
  const colorMap: Record<string, { glow: string; border: string }> = {
    cyan: {
      glow: "oklch(85% 0.2 200)",
      border: "oklch(75% 0.22 200)",
    },
    purple: {
      glow: "oklch(75% 0.25 295)",
      border: "oklch(65% 0.27 295)",
    },
    green: {
      glow: "oklch(80% 0.22 140)",
      border: "oklch(70% 0.24 140)",
    },
    pink: {
      glow: "oklch(78% 0.24 340)",
      border: "oklch(68% 0.26 340)",
    },
    accent: {
      glow: "var(--color-accent)",
      border: "var(--color-accent)",
    },
  }

  const c = colorMap[color] ?? colorMap.cyan

  return (
    <>
      <style>{`
        @keyframes neon-pulse {
          0%, 100% {
            box-shadow:
              0 0 4px 1px var(--neon-color),
              0 0 12px 3px var(--neon-color),
              inset 0 0 6px 0px var(--neon-color);
            border-color: var(--neon-border);
          }
          50% {
            box-shadow:
              0 0 8px 2px var(--neon-color),
              0 0 24px 6px var(--neon-color),
              inset 0 0 10px 1px var(--neon-color);
            border-color: var(--neon-border);
          }
        }
        .neon-border-card {
          animation: neon-pulse 2.4s ease-in-out infinite;
        }
      `}</style>
      <div
        className={[
          "neon-border-card rounded-xl border bg-[var(--color-surface-1)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          ["--neon-color" as string]: c.glow,
          ["--neon-border" as string]: c.border,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export { NeonBorder }
export default NeonBorder
