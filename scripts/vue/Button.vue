<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants'

const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'transition-all duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  variants: {
    variant: {
      default: [
        'bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold',
        'hover:brightness-110 active:brightness-90',
        'shadow-transparent hover:shadow-[0_0_20px_0px_oklch(78%_0.17_200_/_0.35)]',
        'transition-[filter,box-shadow,background-color] duration-200',
      ],
      secondary: [
        'bg-[var(--color-surface-2)] text-[var(--color-text-1)] border border-[var(--color-border)]',
        'hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)]',
      ],
      outline: [
        'border border-[var(--color-border)] text-[var(--color-text-2)] bg-transparent',
        'hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-1)]',
      ],
      ghost: [
        'text-[var(--color-text-2)] bg-transparent',
        'hover:bg-[var(--color-surface-1)] hover:text-[var(--color-text-1)]',
      ],
      destructive: [
        'bg-red-600 text-white font-semibold',
        'hover:bg-red-500 active:bg-red-700',
        'hover:shadow-[0_0_20px_0px_oklch(50%_0.2_25_/_0.35)]',
        'transition-[background-color,box-shadow] duration-200',
      ],
      link: [
        'text-[var(--color-accent-text)] underline-offset-4 bg-transparent',
        'hover:underline',
      ],
    },
    size: {
      sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
      default: 'h-9 px-4',
      lg: 'h-11 px-6 text-base rounded-lg',
      icon: 'size-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
    size?: 'sm' | 'default' | 'lg' | 'icon'
    disabled?: boolean
    class?: string
    href?: string
    as?: string
  }>(),
  {
    variant: 'default',
    size: 'default',
    disabled: false,
    as: 'button',
  }
)

const tag = computed(() => (props.href ? 'a' : props.as))

const classes = computed(() =>
  buttonVariants({ variant: props.variant, size: props.size, class: props.class })
)
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :disabled="tag === 'button' ? disabled : undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>
