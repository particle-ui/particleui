<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fallback?: string
    size?: 'sm' | 'md' | 'lg'
    class?: string
  }>(),
  { size: 'md', alt: '' }
)

const imgError = ref(false)

const sizeClasses: Record<string, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-xs',
  lg: 'h-12 w-12 text-sm',
}

const containerClasses = computed(() =>
  [
    'relative flex shrink-0 overflow-hidden rounded-full',
    sizeClasses[props.size],
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)

const showImage = computed(() => !!props.src && !imgError.value)

function onError() {
  imgError.value = true
}
</script>

<template>
  <div :class="containerClasses">
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      class="aspect-square h-full w-full object-cover"
      @error="onError"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-2)] font-medium"
    >
      {{ fallback }}
    </div>
  </div>
</template>
