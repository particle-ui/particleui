<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
    class?: string
  }>(),
  { orientation: 'horizontal' }
)

const classes = computed(() =>
  [
    'shrink-0 bg-[var(--color-border)]',
    props.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="classes"
  />
</template>
