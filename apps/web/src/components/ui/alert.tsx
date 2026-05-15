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
        "bg-[var(--color-info-dim)] border-[var(--color-info-border)]",
        "text-[var(--color-info-text)]",
        "[&>svg]:text-[var(--color-info)]",
      ],
      success: [
        "bg-[var(--color-success-dim)] border-[var(--color-success-border)]",
        "text-[var(--color-success-text)]",
        "[&>svg]:text-[var(--color-success)]",
      ],
      warning: [
        "bg-[var(--color-warning-dim)] border-[var(--color-warning-border)]",
        "text-[var(--color-warning-text)]",
        "[&>svg]:text-[var(--color-warning)]",
      ],
      destructive: [
        "bg-[var(--color-error-dim)] border-[var(--color-error-border)]",
        "text-[var(--color-error-text)]",
        "[&>svg]:text-[var(--color-error)]",
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
