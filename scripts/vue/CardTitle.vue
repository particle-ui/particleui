<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  [
    'text-base font-semibold leading-tight tracking-tight text-[var(--color-text-1)]',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div :class="classes" data-slot="card-title">
    <slot />
  </div>
</template>
