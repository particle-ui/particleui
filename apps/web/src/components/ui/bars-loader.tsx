import { cn } from "@/lib/utils"

interface BarsLoaderProps {
  size?: "sm" | "md" | "lg"
  bars?: number
  className?: string
}

const heights = {
  sm: "h-5",
  md: "h-8",
  lg: "h-12",
}

const widths = {
  sm: "w-[2px] gap-[3px]",
  md: "w-[3px] gap-1",
  lg: "w-1 gap-1.5",
}

export function BarsLoader({ size = "md", bars = 5, className }: BarsLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-end", widths[size], className)}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn("rounded-full bg-[var(--color-accent)]", heights[size])}
          style={{
            animation: "bars-wave 1s ease-in-out infinite",
            animationDelay: `${(i / bars) * 0.6}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bars-wave {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50%       { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}
