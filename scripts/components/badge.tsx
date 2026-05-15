import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const badgeVariants = tv({
  base: [
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
    "transition-colors duration-150",
    "border",
  ],
  variants: {
    variant: {
      default: [
        "bg-[var(--color-accent-dim)] text-[var(--color-accent-text)] border-[var(--color-accent-border)]",
      ],
      secondary: [
        "bg-[var(--color-surface-2)] text-[var(--color-text-2)] border-[var(--color-border)]",
      ],
      outline: [
        "bg-transparent text-[var(--color-text-2)] border-[var(--color-border)]",
      ],
      success: [
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      ],
      destructive: [
        "bg-red-500/10 text-red-400 border-red-500/30",
      ],
      warning: [
        "bg-amber-500/10 text-amber-400 border-amber-500/30",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ variant, className })} {...props} />
  )
}

export { Badge, badgeVariants }
