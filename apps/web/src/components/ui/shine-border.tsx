"use client"

import * as React from "react"

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  shineColor?: string | string[]
  duration?: number
  borderWidth?: number
}

function ShineBorder({
  children,
  className,
  shineColor = ["oklch(78% 0.17 200)", "oklch(78% 0.17 280)", "oklch(78% 0.17 320)"],
  duration = 8,
  borderWidth = 1,
  style,
  ...props
}: ShineBorderProps) {
  const gradient = Array.isArray(shineColor)
    ? shineColor.join(", ")
    : `${shineColor}, transparent, ${shineColor}`

  const id = React.useId().replace(/:/g, "")

  return (
    <div
      style={{ position: "relative", ...style }}
      className={["rounded-xl overflow-hidden", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: borderWidth,
          background: `conic-gradient(from var(--shine-angle, 0deg), ${gradient})`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `shine-rotate-${id} ${duration}s linear infinite`,
        }}
      />
      <style>{`
        @keyframes shine-rotate-${id} {
          from { --shine-angle: 0deg; }
          to   { --shine-angle: 360deg; }
        }
        @property --shine-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
      <div
        className="relative z-[1] rounded-[inherit] bg-[var(--color-surface-1)]"
        style={{ height: "100%" }}
      >
        {children}
      </div>
    </div>
  )
}

export { ShineBorder }
