import * as React from "react"

interface BadgeShineProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "pro" | "new"
}

function BadgeShine({
  children,
  className,
  variant = "default",
}: BadgeShineProps) {
  const variantClasses: Record<string, string> = {
    default:
      "bg-[var(--color-surface-1)] text-[var(--color-text-2)] border border-[var(--color-border)]",
    pro:
      "bg-[var(--color-accent)] text-[var(--color-bg)] border border-transparent",
    new:
      "bg-[oklch(30%_0.08_250)] text-[oklch(85%_0.18_250)] border border-[oklch(50%_0.15_250)]",
  }

  return (
    <>
      <style>{`
        @keyframes badge-shine-sweep {
          0% { left: -60%; opacity: 0; }
          10% { opacity: 1; }
          50% { left: 120%; opacity: 1; }
          51%, 100% { left: 120%; opacity: 0; }
        }
        .badge-shine-light {
          animation: badge-shine-sweep 3.5s ease-in-out infinite;
        }
      `}</style>
      <span
        className={[
          "relative inline-flex items-center gap-1 overflow-hidden rounded-full px-2.5 py-0.5 text-xs font-medium",
          variantClasses[variant] ?? variantClasses.default,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          className="badge-shine-light pointer-events-none absolute top-0 h-full w-1/3"
          aria-hidden
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(100% 0 0 / 0.4) 50%, transparent 100%)",
            transform: "skewX(-20deg)",
          }}
        />
        {children}
      </span>
    </>
  )
}

export { BadgeShine }
export default BadgeShine
