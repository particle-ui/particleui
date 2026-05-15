<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    class?: string
    children?: Snippet
    [key: string]: unknown
  }

  let { class: className, children, ...rest }: Props = $props()
</script>

<p class="text-sm text-[var(--color-text-3)] {className ?? ''}" {...rest}>
  {@render children?.()}
</p>
