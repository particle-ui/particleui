"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glowButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-particle-600 text-white hover:bg-particle-500 shadow-glow-sm hover:shadow-glow-md",
        electric:
          "bg-electric-500 text-white hover:bg-electric-400 shadow-[0_0_20px_4px_oklch(68%_0.27_205_/_0.4)] hover:shadow-[0_0_30px_6px_oklch(68%_0.27_205_/_0.6)]",
        outline:
          "border border-particle-600 text-particle-400 hover:bg-particle-950 hover:shadow-glow-sm",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-6",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(glowButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
GlowButton.displayName = "GlowButton"

export { GlowButton, glowButtonVariants }

