<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const classes = computed(() =>
  ['flex items-center px-5 pb-5 pt-0', props.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div :class="classes" data-slot="card-footer">
    <slot />
  </div>
</template>
