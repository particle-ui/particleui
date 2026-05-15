<script lang="ts">
  interface Props {
    type?: string
    placeholder?: string
    value?: string | number
    disabled?: boolean
    class?: string
    [key: string]: unknown
  }

  let {
    type = "text",
    placeholder,
    value = $bindable(),
    disabled = false,
    class: className,
    ...props
  }: Props = $props()
</script>

<input
  {type}
  {placeholder}
  {disabled}
  bind:value
  class="flex h-9 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-1)] px-3 py-1 text-sm text-[var(--color-text-1)] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50 hover:border-[var(--color-border-hover)] {className ?? ''}"
  {...props}
/>
