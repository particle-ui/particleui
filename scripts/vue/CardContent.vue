<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  ['px-5 pb-5', props.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div :class="classes" data-slot="card-content">
    <slot />
  </div>
</template>
