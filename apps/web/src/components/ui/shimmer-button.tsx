"use client"

import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const shimmerInnerVariants = tv({
  base: [
    "relative inline-flex items-center justify-center gap-2 w-full h-full",
    "rounded-[5px] text-sm font-semibold cursor-pointer select-none",
    "transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  variants: {
    variant: {
      default: "bg-[var(--color-surface-1)] text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
      filled: "bg-[var(--color-accent)] text-[var(--color-bg)] hover:brightness-110",
      dark: "bg-[var(--color-bg)] text-[var(--color-text-1)] hover:bg-[var(--color-surface-1)]",
    },
  },
  defaultVariants: { variant: "default" },
})

const shimmerWrapVariants = tv({
  base: "relative inline-flex overflow-hidden rounded-md p-[1.5px]",
  variants: {
    size: {
      sm: "h-8",
      default: "h-9",
      lg: "h-11",
    },
  },
  defaultVariants: { size: "default" },
})

const shimmerPaddingVariants = tv({
  base: "relative inline-flex items-center justify-center px-4",
  variants: {
    size: {
      sm: "px-3 text-xs",
      default: "px-4",
      lg: "px-6 text-base",
    },
  },
  defaultVariants: { size: "default" },
})

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof shimmerInnerVariants>,
    VariantProps<typeof shimmerWrapVariants> {}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, variant, size, children, style, ...props }, ref) => {
    const gradientColor =
      variant === "filled"
        ? `conic-gradient(from 0deg, transparent 0%, var(--color-glass-highlight) 20%, transparent 40%)`
        : "conic-gradient(from 0deg, transparent 0%, var(--color-accent) 20%, transparent 40%)"

    return (
      <div className={shimmerWrapVariants({ size })}>
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: "-150%",
            background: gradientColor,
            animation: "shimmer-spin 2.5s linear infinite",
          }}
        />
        <button
          ref={ref}
          style={style}
          className={[shimmerInnerVariants({ variant }), shimmerPaddingVariants({ size }), className]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </button>
      </div>
    )
  }
)
ShimmerButton.displayName = "ShimmerButton"

export { ShimmerButton }
