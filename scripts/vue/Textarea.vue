<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    rows?: number
    class?: string
  }>(),
  {
    disabled: false,
    rows: 3,
  }
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <textarea
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
    :class="[
      'flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm',
      'bg-[var(--color-surface-1)] text-[var(--color-text-1)]',
      'border border-[var(--color-border)]',
      'placeholder:text-[var(--color-text-4)]',
      'resize-y transition-colors duration-150',
      'hover:border-[var(--color-border-hover)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0 focus-visible:border-[var(--color-accent-border)]',
      'disabled:cursor-not-allowed disabled:opacity-40',
      'selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]',
      props.class,
    ].filter(Boolean).join(' ')"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
