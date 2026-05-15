<script lang="ts">
  import type { Snippet } from "svelte"
  import { setContext } from "svelte"

  interface Props {
    defaultValue?: string
    value?: string
    onchange?: (value: string) => void
    class?: string
    children?: Snippet
    [key: string]: unknown
  }

  let {
    defaultValue = "",
    value = $bindable(),
    onchange,
    class: className,
    children,
    ...rest
  }: Props = $props()

  let activeTab = $state(value ?? defaultValue)

  $effect(() => {
    if (value !== undefined) {
      activeTab = value
    }
  })

  setContext("tabs", {
    get active() {
      return activeTab
    },
    set active(v: string) {
      activeTab = v
      value = v
      onchange?.(v)
    },
  })
</script>

<div class="w-full {className ?? ''}" {...rest}>
  {@render children?.()}
</div>
