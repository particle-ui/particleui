<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  ['text-sm text-[var(--color-text-3)]', props.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div :class="classes" data-slot="card-description">
    <slot />
  </div>
</template>
