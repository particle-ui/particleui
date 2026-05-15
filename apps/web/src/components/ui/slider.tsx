"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={[
      "relative flex w-full touch-none select-none items-center",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--color-surface-3)]">
      <SliderPrimitive.Range className="absolute h-full bg-[var(--color-accent)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={[
        "block h-4 w-4 rounded-full",
        "border-2 border-[var(--color-accent)] bg-[var(--color-bg)]",
        "shadow-[0_0_8px_0px_var(--color-accent-glow-sm)]",
        "transition-all duration-150",
        "hover:shadow-[0_0_14px_0px_var(--color-accent-glow-lg)] hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        "disabled:pointer-events-none disabled:opacity-40",
      ].join(" ")}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
