import { cn } from "@/lib/utils"

interface DotsLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const dotSizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-3 w-3",
}

const gaps = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
}

export function DotsLoader({ size = "md", className }: DotsLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center", gaps[size], className)}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-[var(--color-accent)]",
            dotSizes[size]
          )}
          style={{
            animation: "dots-bounce 1s ease-in-out infinite",
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes dots-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-40%); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
