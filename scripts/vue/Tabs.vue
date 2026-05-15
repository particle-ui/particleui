<script setup lang="ts">
import { provide, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    class?: string
  }>(),
  {}
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const active = ref(props.modelValue ?? props.defaultValue ?? '')

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) active.value = val
  }
)

provide('tabs', {
  active,
  setActive: (v: string) => {
    active.value = v
    emit('update:modelValue', v)
  },
})
</script>

<template>
  <div :class="props.class">
    <slot />
  </div>
</template>
