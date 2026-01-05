<script setup lang="ts">
defineProps<{
  loading?: boolean
  label: string
}>()
</script>

<template>
  <UButton
    :loading="loading"
    size="lg"
    class="
      bg-red-600
      hover:bg-red-700
      text-white
      rounded-full
      px-10
      shadow-lg
      shadow-red-600/30
    "
  >
    {{ label }}
  </UButton>
</template>
