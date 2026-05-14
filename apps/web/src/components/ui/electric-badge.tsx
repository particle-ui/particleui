"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ElectricBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  pulse?: boolean
}

const ElectricBadge = React.forwardRef<HTMLSpanElement, ElectricBadgeProps>(
  ({ className, pulse = true, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        "bg-electric-500/10 text-electric-400 border border-electric-500/30",
        pulse && "shadow-[0_0_12px_2px_oklch(68%_0.27_205_/_0.25)]",
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-electric-500" />
        </span>
      )}
      {children}
    </span>
  )
)
ElectricBadge.displayName = "ElectricBadge"

export { ElectricBadge }
