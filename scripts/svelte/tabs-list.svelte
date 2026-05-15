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
  role="tablist"
  class="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--color-surface-2)] p-1 text-[var(--color-text-3)] {className ?? ''}"
  {...rest}
>
  {@render children?.()}
</div>
