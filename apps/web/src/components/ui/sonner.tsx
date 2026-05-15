"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-surface-2)",
          "--normal-border": "var(--color-border)",
          "--normal-text": "var(--color-text-1)",
          "--success-bg": "var(--color-success-dim)",
          "--success-border": "var(--color-success-border)",
          "--success-text": "var(--color-success-text)",
          "--error-bg": "var(--color-error-dim)",
          "--error-border": "var(--color-error-border)",
          "--error-text": "var(--color-error-text)",
          "--warning-bg": "var(--color-warning-dim)",
          "--warning-border": "var(--color-warning-border)",
          "--warning-text": "var(--color-warning-text)",
          "--border-radius": "var(--radius-lg)",
          "--font-size": "13px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast border! shadow-[0_4px_24px_0px_var(--color-shadow-overlay)]! backdrop-blur-sm!",
          title: "font-medium!",
          description: "text-[var(--color-text-3)]!",
          actionButton:
            "bg-[var(--color-accent)]! text-[var(--color-bg)]! text-xs! font-semibold!",
          cancelButton:
            "bg-[var(--color-surface-3)]! text-[var(--color-text-2)]! text-xs!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
