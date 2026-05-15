<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  [
    'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)]',
    'text-[var(--color-text-1)]',
    'transition-colors duration-150',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div :class="classes" data-slot="card">
    <slot />
  </div>
</template>
