<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants'

const labelVariants = tv({
  base: [
    'text-sm font-medium leading-none text-[var(--color-text-2)]',
    'select-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-40',
  ],
})

const props = defineProps<{
  for?: string
  class?: string
}>()

const classes = computed(() => labelVariants({ class: props.class }))
</script>

<template>
  <label :for="props.for" :class="classes">
    <slot />
  </label>
</template>
