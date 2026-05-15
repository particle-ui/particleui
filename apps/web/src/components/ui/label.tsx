"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { tv, type VariantProps } from "tailwind-variants"

const labelVariants = tv({
  base: [
    "text-sm font-medium leading-none text-[var(--color-text-2)]",
    "select-none",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-40",
    "data-[error=true]:text-[var(--color-error-text)]",
  ],
})

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({ className })}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
