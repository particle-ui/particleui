import * as React from "react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={[
          "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm",
          "bg-[var(--color-surface-1)] text-[var(--color-text-1)]",
          "border border-[var(--color-border)]",
          "placeholder:text-[var(--color-text-4)]",
          "resize-y transition-colors duration-150",
          "hover:border-[var(--color-border-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0 focus-visible:border-[var(--color-accent-border)]",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
