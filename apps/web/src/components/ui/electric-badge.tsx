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
        "border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff]",
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00d4ff]" />
        </span>
      )}
      {children}
    </span>
  )
)
ElectricBadge.displayName = "ElectricBadge"

export { ElectricBadge }
