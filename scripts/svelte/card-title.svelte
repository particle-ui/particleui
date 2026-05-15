<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    class?: string
    children?: Snippet
    [key: string]: unknown
  }

  let { class: className, children, ...rest }: Props = $props()
</script>

<h3
  class="text-lg font-semibold leading-none tracking-tight text-[var(--color-text-1)] {className ?? ''}"
  {...rest}
>
  {@render children?.()}
</h3>
