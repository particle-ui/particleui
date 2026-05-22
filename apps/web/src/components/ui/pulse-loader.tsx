import { cn } from "@/lib/utils"

interface PulseLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizes = {
  sm: { outer: "h-6 w-6", inner: "h-3 w-3" },
  md: { outer: "h-10 w-10", inner: "h-5 w-5" },
  lg: { outer: "h-14 w-14", inner: "h-7 w-7" },
}

export function PulseLoader({ size = "md", className }: PulseLoaderProps) {
  const s = sizes[size]
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative flex items-center justify-center", s.outer, className)}
    >
      {/* expanding ring */}
      <span
        className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
        style={{ animation: "pulse-ring 1.4s cubic-bezier(0.24, 0, 0.38, 1) infinite" }}
      />
      {/* second ring with delay */}
      <span
        className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
        style={{ animation: "pulse-ring 1.4s cubic-bezier(0.24, 0, 0.38, 1) 0.7s infinite" }}
      />
      {/* core dot */}
      <span className={cn("relative z-10 rounded-full bg-[var(--color-accent)]", s.inner)} />
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.33); opacity: 0.8; }
          80%,
          100% { transform: scale(1);    opacity: 0; }
        }
      `}</style>
    </div>
  )
}
