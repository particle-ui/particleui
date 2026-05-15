<script lang="ts">
  interface Props {
    checked?: boolean
    onchange?: (checked: boolean) => void
    disabled?: boolean
    id?: string
    class?: string
    [key: string]: unknown
  }

  let {
    checked = $bindable(false),
    onchange,
    disabled = false,
    id,
    class: className,
    ...rest
  }: Props = $props()

  function toggle() {
    if (disabled) return
    checked = !checked
    onchange?.(checked)
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      toggle()
    }
  }
</script>

<button
  {id}
  type="button"
  role="checkbox"
  aria-checked={checked}
  {disabled}
  onclick={toggle}
  onkeydown={handleKeydown}
  class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer {checked
    ? 'bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent-dim)] text-[var(--color-bg)]'
    : 'bg-transparent border-[var(--color-border)] hover:border-[var(--color-border-hover)]'} {className ?? ''}"
  {...rest}
>
  {#if checked}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-3 w-3"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  {/if}
</button>
