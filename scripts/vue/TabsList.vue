<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  [
    'inline-flex h-9 items-center justify-center rounded-lg p-1',
    'bg-[var(--color-surface-1)] border border-[var(--color-border)]',
    'text-[var(--color-text-3)]',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div role="tablist" :class="classes">
    <slot />
  </div>
</template>
