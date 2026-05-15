import { Info, Lightbulb, Warning, WarningOctagon } from "@phosphor-icons/react/dist/ssr"

type CalloutVariant = "tip" | "note" | "warning" | "danger"

const VARIANT_CONFIG: Record<
  CalloutVariant,
  {
    icon: React.ElementType
    containerClass: string
    iconClass: string
    titleClass: string
    defaultTitle: string
  }
> = {
  tip: {
    icon: Lightbulb,
    containerClass: "bg-info-dim border-info",
    iconClass: "text-info",
    titleClass: "text-info",
    defaultTitle: "Tip",
  },
  note: {
    icon: Info,
    containerClass: "bg-surface-1 border-border",
    iconClass: "text-text-3",
    titleClass: "text-text-2",
    defaultTitle: "Note",
  },
  warning: {
    icon: Warning,
    containerClass: "bg-warning-dim border-warning",
    iconClass: "text-warning",
    titleClass: "text-warning",
    defaultTitle: "Warning",
  },
  danger: {
    icon: WarningOctagon,
    containerClass: "bg-error-dim border-error",
    iconClass: "text-error",
    titleClass: "text-error",
    defaultTitle: "Danger",
  },
}

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
}

export function Callout({ variant = "note", title, children }: CalloutProps) {
  const config = VARIANT_CONFIG[variant]
  const Icon = config.icon
  const displayTitle = title ?? config.defaultTitle

  return (
    <div
      className={`my-5 flex gap-3 rounded-xl border-l-[3px] border px-4 py-3.5 ${config.containerClass}`}
    >
      <Icon size={16} weight="bold" className={`mt-0.5 shrink-0 ${config.iconClass}`} />
      <div className="min-w-0">
        <p className={`mb-1 text-[0.8125rem] font-semibold ${config.titleClass}`}>
          {displayTitle}
        </p>
        <div className="text-sm text-text-2 leading-[1.7] [&_code]:rounded [&_code]:bg-surface-2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-text-2">
          {children}
        </div>
      </div>
    </div>
  )
}
