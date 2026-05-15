<script lang="ts">
  import type { Snippet } from "svelte"
  import { getContext } from "svelte"

  interface TabsContext {
    active: string
  }

  interface Props {
    value: string
    disabled?: boolean
    class?: string
    children?: Snippet
    [key: string]: unknown
  }

  let { value, disabled = false, class: className, children, ...rest }: Props = $props()

  const ctx = getContext<TabsContext>("tabs")

  const isActive = $derived(ctx.active === value)

  function activate() {
    if (!disabled) {
      ctx.active = value
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      activate()
    }
  }
</script>

<button
  type="button"
  role="tab"
  aria-selected={isActive}
  aria-controls="tabpanel-{value}"
  id="tabtrigger-{value}"
  {disabled}
  onclick={activate}
  onkeydown={handleKeydown}
  class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-[var(--color-bg)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer {isActive
    ? 'bg-[var(--color-surface-3)] text-[var(--color-text-1)] shadow-sm'
    : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)] hover:bg-[var(--color-surface-3)]/50'} {className ?? ''}"
  {...rest}
>
  {@render children?.()}
</button>
