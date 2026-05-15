"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={["grid gap-2", className].filter(Boolean).join(" ")}
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={[
      "aspect-square h-4 w-4 rounded-full",
      "border border-[var(--color-border)]",
      "bg-[var(--color-surface-1)]",
      "text-[var(--color-accent)]",
      "transition-all duration-150",
      "hover:border-[var(--color-border-hover)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:border-[var(--color-accent)] data-[state=checked]:bg-[var(--color-accent-dim)]",
      "data-[state=checked]:shadow-[0_0_8px_0px_var(--color-accent-glow-sm)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2 w-2 fill-[var(--color-accent)] text-[var(--color-accent)]" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
