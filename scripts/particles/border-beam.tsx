"use client"

import * as React from "react"

interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
}

function BorderBeam({
  className,
  children,
  duration = 4,
  colorFrom = "oklch(78% 0.17 200)",
  colorTo = "oklch(78% 0.17 280)",
  borderWidth = 1.5,
  style,
  ...props
}: BorderBeamProps) {
  const id = React.useId()
  const animId = `border-beam-${id.replace(/:/g, "")}`

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
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 20%, ${colorTo} 40%, transparent 60%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `${animId} ${duration}s linear infinite`,
        }}
      />
      <style>{`
        @keyframes ${animId} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  )
}

export { BorderBeam }
