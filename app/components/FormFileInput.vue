<!-- components/FormFileInput.vue -->
<template>
  <UFormGroup :label="label" :error="error">
    <div
      class="relative border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer"
      :class="[
        dragActive 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-300 hover:border-gray-400'
      ]"
      @dragenter.prevent="handleDrag"
      @dragleave.prevent="handleDragLeave"
      @dragover.prevent="handleDrag"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInputRef"
        type="file"
        :accept="accept"
        :multiple="multiple"
        class="hidden"
        @change="handleFileChange"
      />
      
      <UIcon name="i-heroicons-arrow-up-tray" class="mx-auto mb-3 text-gray-400 w-8 h-8" />
      
      <p class="text-sm text-gray-600 mb-2">
        Glissez vos fichiers ici ou 
        <span class="text-primary-600 font-medium">parcourez</span>
      </p>
      <p class="text-xs text-gray-500">
        PDF, JPG, PNG jusqu'à 10MB
      </p>
    </div>

    <!-- Liste des fichiers -->
    <div v-if="files.length > 0" class="space-y-2 mt-3">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
      >
        <div class="flex items-center space-x-3 flex-1 min-w-0">
          <div class="flex-shrink-0 w-8 h-8 bg-primary-100 rounded flex items-center justify-center">
            <UIcon name="i-heroicons-document" class="w-4 h-4 text-primary-600" />
          </div>
          <span class="text-sm text-gray-700 truncate">
            {{ file.name }}
          </span>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          size="xs"
          color="gray"
          variant="ghost"
          @click.stop="removeFile(index)"
        />
      </div>
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [Array, Object, null] as PropType<File[] | File | null>,
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: '*'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInputRef = ref<HTMLInputElement | null>(null)
const dragActive = ref(false)

const files = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue
  } else if (props.modelValue && !Array.isArray(props.modelValue)) {
    return [props.modelValue]
  }
  return []
})

const handleDrag = (e: DragEvent) => {
  dragActive.value = true
}

const handleDragLeave = (e: DragEvent) => {
  dragActive.value = false
}

const handleDrop = (e: DragEvent) => {
  dragActive.value = false
  
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    handleFiles(e.dataTransfer.files)
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    handleFiles(target.files)
  }
}

const handleFiles = (fileList: FileList) => {
  const fileArray = Array.from(fileList)
  
  if (props.multiple) {
    emit('update:modelValue', fileArray)
  } else {
    emit('update:modelValue', fileArray[0])
  }
}

const removeFile = (index: number) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    const newFiles = props.modelValue.filter((_, i) => i !== index)
    emit('update:modelValue', newFiles)
  } else {
    emit('update:modelValue', null)
  }
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}
</script>