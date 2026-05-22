import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizes = {
  xs: "h-3 w-3 border-[1.5px]",
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[2.5px]",
  xl: "h-12 w-12 border-[3px]",
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "rounded-full border-current border-t-transparent animate-spin",
        "text-[var(--color-accent)]",
        sizes[size],
        className
      )}
    />
  )
}
