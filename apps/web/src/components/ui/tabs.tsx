"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={[
      "inline-flex h-9 items-center justify-center rounded-lg p-1",
      "bg-[var(--color-surface-1)] border border-[var(--color-border)]",
      "text-[var(--color-text-3)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={[
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium",
      "transition-all duration-150 cursor-pointer select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface-1)]",
      "disabled:pointer-events-none disabled:opacity-40",
      "data-[state=active]:bg-[var(--color-surface-3)] data-[state=active]:text-[var(--color-text-1)] data-[state=active]:shadow-sm",
      "data-[state=inactive]:text-[var(--color-text-3)] data-[state=inactive]:hover:text-[var(--color-text-2)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={[
      "mt-3 ring-offset-[var(--color-bg)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
