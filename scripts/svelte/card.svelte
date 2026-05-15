<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    class?: string
    children?: Snippet
    [key: string]: unknown
  }

  let { class: className, children, ...rest }: Props = $props()
</script>

<div
  class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-text-1)] shadow-sm transition-colors {className ?? ''}"
  {...rest}
>
  {@render children?.()}
</div>
