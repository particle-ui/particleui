<script lang="ts">
  interface Props {
    class?: string
    [key: string]: unknown
  }

  let { class: className, ...rest }: Props = $props()
</script>

<div
  class="animate-pulse rounded-md bg-[var(--color-surface-2)] {className ?? ''}"
  {...rest}
></div>
