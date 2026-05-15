import * as React from "react"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      className={[
        "animate-pulse rounded-md",
        "bg-[var(--color-surface-2)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}

export { Skeleton }
