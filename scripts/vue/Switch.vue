<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
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

const trackClasses = computed(() =>
  [
    'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full',
    'border-2 border-transparent',
    'transition-[background-color,box-shadow] duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
    'disabled:cursor-not-allowed disabled:opacity-40',
    props.modelValue
      ? 'bg-[var(--color-accent)] shadow-[0_0_10px_0px_oklch(78%_0.17_200_/_0.4)]'
      : 'bg-[var(--color-surface-3)]',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)

const thumbClasses = computed(() =>
  [
    'pointer-events-none block h-4 w-4 rounded-full',
    'bg-white shadow-sm',
    'ring-0 transition-transform duration-200',
    props.modelValue ? 'translate-x-4' : 'translate-x-0',
  ].join(' ')
)
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="trackClasses"
    @click="toggle"
  >
    <span :class="thumbClasses" />
  </button>
</template>
