"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={[
      "relative h-2 w-full overflow-hidden rounded-full",
      "bg-[var(--color-surface-3)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={[
        "h-full w-full flex-1 rounded-full",
        "bg-[var(--color-accent)]",
        "shadow-[0_0_10px_0px_oklch(78%_0.17_200_/_0.4)]",
        "transition-all duration-500 ease-out",
      ].join(" ")}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
