<script lang="ts">
  import type { Snippet } from "svelte"
  import { tv } from "tailwind-variants"

  const badge = tv({
    base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2",
    variants: {
      variant: {
        default:
          "bg-[var(--color-accent)] text-[var(--color-bg)] border border-transparent shadow-[0_0_8px_var(--color-accent-dim)]",
        outline:
          "border border-[var(--color-accent-border)] text-[var(--color-accent-text)] bg-transparent",
        secondary:
          "bg-[var(--color-surface-2)] text-[var(--color-text-2)] border border-[var(--color-border)]",
        destructive:
          "bg-red-500/20 text-red-400 border border-red-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  })

  interface Props {
    variant?: "default" | "outline" | "secondary" | "destructive"
    class?: string
    children?: Snippet
  }

  let { variant = "default", class: className, children }: Props = $props()

  const classes = $derived(badge({ variant, class: className }))
</script>

<span class={classes}>
  {@render children?.()}
</span>
