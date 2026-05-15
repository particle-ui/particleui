<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: string
    placeholder?: string
    disabled?: boolean
    class?: string
  }>(),
  {
    type: 'text',
    disabled: false,
  }
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <input
    v-bind="$attrs"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[
      'flex h-9 w-full rounded-md px-3 py-1 text-sm',
      'bg-[var(--color-surface-1)] text-[var(--color-text-1)]',
      'border border-[var(--color-border)]',
      'placeholder:text-[var(--color-text-4)]',
      'transition-colors duration-150',
      'hover:border-[var(--color-border-hover)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0 focus-visible:border-[var(--color-accent-border)]',
      'disabled:cursor-not-allowed disabled:opacity-40',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-text-2)]',
      'selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]',
      props.class,
    ].filter(Boolean).join(' ')"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
