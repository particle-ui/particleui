<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants'

const badgeVariants = tv({
  base: [
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    'transition-colors duration-150',
    'border',
  ],
  variants: {
    variant: {
      default: [
        'bg-[var(--color-accent-dim)] text-[var(--color-accent-text)] border-[var(--color-accent-border)]',
      ],
      secondary: [
        'bg-[var(--color-surface-2)] text-[var(--color-text-2)] border-[var(--color-border)]',
      ],
      outline: [
        'bg-transparent text-[var(--color-text-2)] border-[var(--color-border)]',
      ],
      destructive: [
        'bg-red-500/10 text-red-400 border-red-500/30',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary' | 'outline' | 'destructive'
    class?: string
  }>(),
  { variant: 'default' }
)

const classes = computed(() => badgeVariants({ variant: props.variant, class: props.class }))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
