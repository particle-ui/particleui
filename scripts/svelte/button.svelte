<script lang="ts">
  import type { Snippet } from "svelte"
  import { tv } from "tailwind-variants"

  const button = tv({
    base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variants: {
      variant: {
        default:
          "bg-white text-black shadow-sm hover:shadow-[0_0_0_2px_var(--color-accent),0_0_16px_var(--color-accent-dim)] hover:bg-white/90",
        outline:
          "border border-[var(--color-border)] bg-transparent text-[var(--color-text-1)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_8px_var(--color-accent-dim)]",
        ghost:
          "bg-transparent text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-1)]",
        secondary:
          "bg-[var(--color-surface-2)] text-[var(--color-text-1)] border border-[var(--color-border)] hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)]",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-[0_0_12px_oklch(62%_0.22_25/0.4)]",
        link: "text-[var(--color-accent)] underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  })

  interface Props {
    variant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    disabled?: boolean
    class?: string
    href?: string
    children?: Snippet
    [key: string]: unknown
  }

  let {
    variant = "default",
    size = "default",
    disabled = false,
    class: className,
    href,
    children,
    ...rest
  }: Props = $props()

  const classes = $derived(button({ variant, size, class: className }))
</script>

{#if href}
  <a {href} class={classes} aria-disabled={disabled} {...rest}>
    {@render children?.()}
  </a>
{:else}
  <button class={classes} {disabled} {...rest}>
    {@render children?.()}
  </button>
{/if}
