"use client"

import * as React from "react"

interface GlowInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  glowColor?: string
}

const GlowInput = React.forwardRef<HTMLInputElement, GlowInputProps>(
  ({ className, type, glowColor = "var(--color-accent)", style, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)

    return (
      <div
        className="relative"
        style={{
          filter: focused ? `drop-shadow(0 0 8px ${glowColor}40)` : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {focused && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${glowColor}60, ${glowColor}20 50%, ${glowColor}60)`,
              backgroundSize: "200% 200%",
              animation: "gradient-shift 2s linear infinite",
              zIndex: 0,
            }}
          />
        )}
        <input
          type={type}
          ref={ref}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          style={{ position: "relative", zIndex: 1, ...style }}
          className={[
            "flex h-9 w-full rounded-md px-3 py-1 text-sm",
            "bg-[var(--color-surface-1)] text-[var(--color-text-1)]",
            "border border-[var(--color-border)]",
            "placeholder:text-[var(--color-text-4)]",
            "transition-[border-color] duration-200",
            focused
              ? "border-[var(--color-accent)] outline-none ring-0"
              : "hover:border-[var(--color-border-hover)]",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
      </div>
    )
  }
)
GlowInput.displayName = "GlowInput"

export { GlowInput }
