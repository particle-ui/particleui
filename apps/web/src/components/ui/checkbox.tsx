"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={[
      "peer h-4 w-4 shrink-0 rounded-sm",
      "border border-[var(--color-border)]",
      "bg-[var(--color-surface-1)]",
      "transition-all duration-150",
      "hover:border-[var(--color-border-hover)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:bg-[var(--color-accent)] data-[state=checked]:border-[var(--color-accent)]",
      "data-[state=checked]:shadow-[0_0_8px_0px_var(--color-accent-glow-sm)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-[var(--color-bg)]">
      <Check className="h-3 w-3 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
