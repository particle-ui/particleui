"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={[
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "border-2 border-transparent",
      "bg-[var(--color-surface-3)]",
      "transition-[background-color,box-shadow] duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:bg-[var(--color-accent)]",
      "data-[state=checked]:shadow-[0_0_10px_0px_oklch(78%_0.17_200_/_0.4)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={[
        "pointer-events-none block h-4 w-4 rounded-full",
        "bg-white shadow-sm",
        "ring-0 transition-transform duration-200",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      ].join(" ")}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
