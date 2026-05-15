<script lang="ts">
  interface Props {
    checked?: boolean
    onchange?: (checked: boolean) => void
    disabled?: boolean
    class?: string
    id?: string
    [key: string]: unknown
  }

  let {
    checked = $bindable(false),
    onchange,
    disabled = false,
    class: className,
    id,
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
  role="switch"
  aria-checked={checked}
  {disabled}
  onclick={toggle}
  onkeydown={handleKeydown}
  class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-50 {checked
    ? 'bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-dim)]'
    : 'bg-[var(--color-surface-3)]'} {className ?? ''}"
  {...rest}
>
  <span
    class="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out {checked
      ? 'translate-x-4'
      : 'translate-x-0'}"
  ></span>
</button>
