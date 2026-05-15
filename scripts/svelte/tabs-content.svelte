<script lang="ts">
  import type { Snippet } from "svelte"
  import { getContext } from "svelte"

  interface TabsContext {
    active: string
  }

  interface Props {
    value: string
    class?: string
    children?: Snippet
    [key: string]: unknown
  }

  let { value, class: className, children, ...rest }: Props = $props()

  const ctx = getContext<TabsContext>("tabs")

  const isActive = $derived(ctx.active === value)
</script>

<div
  role="tabpanel"
  id="tabpanel-{value}"
  aria-labelledby="tabtrigger-{value}"
  tabindex="0"
  hidden={!isActive}
  class="mt-2 ring-offset-[var(--color-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 {className ?? ''}"
  {...rest}
>
  {#if isActive}
    {@render children?.()}
  {/if}
</div>
