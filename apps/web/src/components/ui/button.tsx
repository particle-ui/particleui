"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-150 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  ],
  variants: {
    variant: {
      default: [
        "bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold",
        "hover:brightness-110 active:brightness-90",
        "shadow-transparent hover:shadow-[0_0_20px_0px_oklch(96%_0.01_80_/_0.25)]",
        "transition-[filter,box-shadow,background-color] duration-200",
      ],
      secondary: [
        "bg-[var(--color-surface-2)] text-[var(--color-text-1)] border border-[var(--color-border)]",
        "hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)]",
      ],
      outline: [
        "border border-[var(--color-border)] text-[var(--color-text-2)] bg-transparent",
        "hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-1)]",
      ],
      ghost: [
        "text-[var(--color-text-2)] bg-transparent",
        "hover:bg-[var(--color-surface-1)] hover:text-[var(--color-text-1)]",
      ],
      destructive: [
        "bg-[var(--color-error)] text-[var(--color-bg)] font-semibold",
        "hover:brightness-110 active:brightness-90",
        "hover:shadow-[0_0_20px_0px_var(--color-error-dim)]",
        "transition-[filter,box-shadow,background-color] duration-200",
      ],
      link: [
        "text-[var(--color-accent-text)] underline-offset-4 bg-transparent",
        "hover:underline",
      ],
    },
    size: {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      default: "h-9 px-4",
      lg: "h-11 px-6 text-base rounded-lg",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
