<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

const props = withDefaults(
  defineProps<{
    value: string
    class?: string
  }>(),
  {}
)

const tabs = inject<{ active: Ref<string>; setActive: (v: string) => void }>('tabs')

const isActive = computed(() => tabs?.active.value === props.value)

const classes = computed(() =>
  [
    'mt-3 ring-offset-[var(--color-bg)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div
    v-if="isActive"
    role="tabpanel"
    :class="classes"
  >
    <slot />
  </div>
</template>
