<!-- components/FormTextarea.vue -->
<template>
  <UFormGroup :label="label" :error="error" class="w-full">
    <UTextarea
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :rows="rows"
      size="xl"
      class="w-full"
      :ui="{
        base: 'w-full resize-none',
        rounded: 'rounded-lg',
        padding: {
          xl: 'px-4 py-3.5'
        }
      }"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
