<script lang="ts">
  interface Props {
    placeholder?: string
    value?: string
    disabled?: boolean
    rows?: number
    class?: string
    [key: string]: unknown
  }

  let {
    placeholder,
    value = $bindable(),
    disabled = false,
    rows = 4,
    class: className,
    ...props
  }: Props = $props()
</script>

<textarea
  {placeholder}
  {disabled}
  {rows}
  bind:value
  class="flex w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-1)] px-3 py-2 text-sm text-[var(--color-text-1)] shadow-sm transition-colors placeholder:text-[var(--color-text-4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50 hover:border-[var(--color-border-hover)] resize-y min-h-[80px] {className ?? ''}"
  {...props}
></textarea>
