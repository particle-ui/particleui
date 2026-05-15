<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    for?: string
    class?: string
    children?: Snippet
    [key: string]: unknown
  }

  let { for: htmlFor, class: className, children, ...rest }: Props = $props()
</script>

<label
  for={htmlFor}
  class="text-sm font-medium leading-none text-[var(--color-text-1)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 {className ?? ''}"
  {...rest}
>
  {@render children?.()}
</label>
