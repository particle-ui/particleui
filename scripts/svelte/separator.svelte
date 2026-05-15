<script lang="ts">
  interface Props {
    orientation?: "horizontal" | "vertical"
    class?: string
    [key: string]: unknown
  }

  let { orientation = "horizontal", class: className, ...rest }: Props = $props()

  const isHorizontal = $derived(orientation === "horizontal")
</script>

{#if isHorizontal}
  <div
    role="separator"
    aria-orientation="horizontal"
    class="h-px w-full bg-[var(--color-border)] shrink-0 {className ?? ''}"
    {...rest}
  ></div>
{:else}
  <div
    role="separator"
    aria-orientation="vertical"
    class="w-px h-full bg-[var(--color-border)] shrink-0 {className ?? ''}"
    {...rest}
  ></div>
{/if}
