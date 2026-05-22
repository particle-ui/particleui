import { cn } from "@/lib/utils"

interface RingLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
}

const borders = {
  sm: "border-[1.5px]",
  md: "border-2",
  lg: "border-[2.5px]",
}

export function RingLoader({ size = "md", className }: RingLoaderProps) {
  const s = sizes[size]
  const b = borders[size]
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative", s, className)}
    >
      {/* outer ring — clockwise */}
      <span
        className={cn(
          "absolute inset-0 rounded-full border-[var(--color-accent)] border-t-transparent border-r-transparent",
          b
        )}
        style={{ animation: "ring-cw 1s linear infinite" }}
      />
      {/* inner ring — counter-clockwise */}
      <span
        className={cn(
          "absolute inset-[25%] rounded-full border-[var(--color-accent-text)] border-b-transparent border-l-transparent",
          b
        )}
        style={{ animation: "ring-ccw 0.7s linear infinite" }}
      />
      <style>{`
        @keyframes ring-cw  { to { transform: rotate(360deg); } }
        @keyframes ring-ccw { to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  )
}
