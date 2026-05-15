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
          "--success-bg": "oklch(15% 0.05 160)",
          "--success-border": "oklch(50% 0.15 160 / 0.4)",
          "--success-text": "oklch(75% 0.15 160)",
          "--error-bg": "oklch(12% 0.05 25)",
          "--error-border": "oklch(50% 0.2 25 / 0.4)",
          "--error-text": "oklch(70% 0.2 25)",
          "--warning-bg": "oklch(14% 0.06 80)",
          "--warning-border": "oklch(55% 0.18 80 / 0.4)",
          "--warning-text": "oklch(78% 0.15 80)",
          "--border-radius": "var(--radius-lg)",
          "--font-size": "13px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast border! shadow-[0_4px_24px_0px_oklch(0%_0_0_/_0.5)]! backdrop-blur-sm!",
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
