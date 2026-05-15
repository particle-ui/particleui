<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

const props = withDefaults(
  defineProps<{
    value: string
    disabled?: boolean
    class?: string
  }>(),
  { disabled: false }
)

const tabs = inject<{ active: Ref<string>; setActive: (v: string) => void }>('tabs')

const isActive = computed(() => tabs?.active.value === props.value)

const classes = computed(() =>
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium',
    'transition-all duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface-1)]',
    'disabled:pointer-events-none disabled:opacity-40',
    isActive.value
      ? 'bg-[var(--color-surface-3)] text-[var(--color-text-1)] shadow-sm'
      : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)

function handleClick() {
  if (!props.disabled) {
    tabs?.setActive(props.value)
  }
}
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="isActive"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
