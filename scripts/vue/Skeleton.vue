<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  ['animate-pulse rounded-md bg-[var(--color-surface-2)]', props.class]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div :class="classes" data-slot="skeleton" />
</template>
