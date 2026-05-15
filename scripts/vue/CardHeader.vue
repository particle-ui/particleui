<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  ['flex flex-col gap-1.5 p-5', props.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div :class="classes" data-slot="card-header">
    <slot />
  </div>
</template>
