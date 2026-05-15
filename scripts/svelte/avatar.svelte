<script lang="ts">
  import { tv } from "tailwind-variants"

  const avatarSizes = tv({
    base: "relative flex shrink-0 overflow-hidden rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)]",
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  })

  interface Props {
    src?: string
    alt?: string
    fallback?: string
    size?: "sm" | "md" | "lg"
    class?: string
  }

  let { src, alt = "", fallback, size = "md", class: className }: Props = $props()

  let imgError = $state(false)

  function handleError() {
    imgError = true
  }

  const showImage = $derived(!!src && !imgError)
  const initials = $derived(
    fallback ??
      alt
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
  )

  const classes = $derived(avatarSizes({ size, class: className }))
</script>

<span class={classes}>
  {#if showImage}
    <img
      {src}
      {alt}
      onerror={handleError}
      class="aspect-square h-full w-full object-cover"
    />
  {:else}
    <span
      class="flex h-full w-full items-center justify-center font-medium text-[var(--color-text-2)]"
      aria-label={alt || fallback}
    >
      {initials}
    </span>
  {/if}
</span>
