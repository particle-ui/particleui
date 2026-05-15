<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    id?: string
    class?: string
  }>(),
  { modelValue: false, disabled: false }
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const classes = computed(() =>
  [
    'peer h-4 w-4 shrink-0 rounded-sm',
    'border border-[var(--color-border)]',
    'bg-[var(--color-surface-1)]',
    'transition-all duration-150',
    'hover:border-[var(--color-border-hover)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
    'disabled:cursor-not-allowed disabled:opacity-40',
    'inline-flex items-center justify-center cursor-pointer',
    props.modelValue
      ? 'bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_8px_0px_oklch(78%_0.17_200_/_0.35)]'
      : '',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :id="id"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="classes"
    @click="toggle"
  >
    <svg
      v-if="modelValue"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-3 w-3 text-[var(--color-bg)]"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </button>
</template>
