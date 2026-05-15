"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    ring?: boolean
  }
>(({ className, ring = false, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={[
      "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full",
      ring && "ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-bg)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={["aspect-square h-full w-full object-cover", className].filter(Boolean).join(" ")}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={[
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-[var(--color-surface-2)] text-[var(--color-text-2)] text-xs font-medium",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
