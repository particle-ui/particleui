"use client"

import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const gradientTextVariants = tv({
  base: "bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_linear_infinite]",
  variants: {
    variant: {
      electric: "bg-gradient-to-r from-[oklch(97%_0.005_80)] via-[oklch(72%_0.003_80)] to-[oklch(97%_0.005_80)]",
      aurora: "bg-gradient-to-r from-[oklch(97%_0.005_80)] via-[oklch(86%_0_0)] to-[oklch(62%_0_0)]",
      fire: "bg-gradient-to-r from-[oklch(97%_0.005_80)] via-[oklch(96%_0.01_80)] to-[oklch(72%_0.003_80)]",
      candy: "bg-gradient-to-r from-[oklch(72%_0.003_80)] via-[oklch(97%_0.005_80)] to-[oklch(72%_0.003_80)]",
      gold: "bg-gradient-to-r from-[oklch(78%_0.008_80)] via-[oklch(96%_0.01_80)] to-[oklch(78%_0.008_80)]",
    },
  },
  defaultVariants: { variant: "electric" },
})

interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {}

function GradientText({ className, variant, ...props }: GradientTextProps) {
  return (
    <span
      className={gradientTextVariants({ variant, className })}
      {...props}
    />
  )
}

export { GradientText, gradientTextVariants }
