<!-- components/FormInput.vue -->
<template>
  <UFormGroup :label="label" :error="error">
    <UInput
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :type="type"
      :placeholder="placeholder"
      size="xl"
      :ui="{
        base: 'w-full',
        rounded: 'rounded-lg',
        padding: {
          xl: 'px-4 py-3'
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
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>