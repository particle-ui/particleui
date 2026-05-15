import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

const alertVariants = tv({
  base: [
    "relative w-full rounded-xl border px-4 py-3.5",
    "text-sm leading-relaxed",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:h-4 [&>svg]:w-4",
    "[&>svg+div]:pl-7",
    "[&:has(svg)]:pl-11",
  ],
  variants: {
    variant: {
      default: [
        "bg-[var(--color-surface-1)] border-[var(--color-border)]",
        "text-[var(--color-text-2)]",
        "[&>svg]:text-[var(--color-text-3)]",
      ],
      info: [
        "bg-[oklch(10%_0.02_220)] border-[oklch(50%_0.15_220_/_0.35)]",
        "text-[oklch(78%_0.12_220)]",
        "[&>svg]:text-[oklch(70%_0.18_220)]",
      ],
      success: [
        "bg-[oklch(10%_0.03_160)] border-[oklch(50%_0.15_160_/_0.35)]",
        "text-[oklch(75%_0.12_160)]",
        "[&>svg]:text-[oklch(65%_0.18_160)]",
      ],
      warning: [
        "bg-[oklch(11%_0.04_80)] border-[oklch(55%_0.18_80_/_0.35)]",
        "text-[oklch(78%_0.14_80)]",
        "[&>svg]:text-[oklch(70%_0.2_80)]",
      ],
      destructive: [
        "bg-[oklch(9%_0.03_25)] border-[oklch(50%_0.2_25_/_0.35)]",
        "text-[oklch(72%_0.15_25)]",
        "[&>svg]:text-[oklch(62%_0.2_25)]",
      ],
    },
  },
  defaultVariants: { variant: "default" },
})

const ICONS = {
  default: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleAlert,
} as const

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon = true, children, ...props }, ref) => {
    const Icon = ICONS[variant ?? "default"]
    return (
      <div
        ref={ref}
        role="alert"
        className={alertVariants({ variant, className })}
        {...props}
      >
        {icon && <Icon />}
        <div>{children}</div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={["mb-1 font-semibold leading-none tracking-tight text-[var(--color-text-1)]", className].filter(Boolean).join(" ")}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={["text-sm leading-relaxed opacity-90", className].filter(Boolean).join(" ")}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
