<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'page-change': [page: number]
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const paginationButtons = computed(() => {
  const buttons = []
  const maxButtons = 5
  let startPage = Math.max(1, props.currentPage - Math.floor(maxButtons / 2))
  let endPage = Math.min(props.totalPages, startPage + maxButtons - 1)
  
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    buttons.push(i)
  }
  
  return buttons
})
</script>

<template>
  <div v-if="totalPages > 1" class="flex flex-col items-center gap-4 mt-12">
    <!-- Pagination Buttons -->
    <div class="flex justify-center items-center gap-2">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg',
          currentPage === 1
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-green-900 to-blue-900/70 text-white hover:scale-105 hover:shadow-xl'
        ]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- First Page -->
      <button
        v-if="paginationButtons[0] > 1"
        @click="goToPage(1)"
        class="px-4 py-2 rounded-lg font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-900 hover:to-blue-900/70 hover:text-white shadow-lg transition-all duration-300 hover:scale-105"
      >
        1
      </button>
      <span v-if="paginationButtons[0] > 2" class="text-gray-500 dark:text-gray-400 px-2">...</span>

      <!-- Page Numbers -->
      <button
        v-for="page in paginationButtons"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg',
          page === currentPage
            ? 'bg-gradient-to-r from-green-900 to-blue-900/70 text-white scale-110 shadow-xl'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-900 hover:to-blue-900/70 hover:text-white hover:scale-105'
        ]"
      >
        {{ page }}
      </button>

      <!-- Last Page -->
      <span v-if="paginationButtons[paginationButtons.length - 1] < totalPages - 1" class="text-gray-500 dark:text-gray-400 px-2">...</span>
      <button
        v-if="paginationButtons[paginationButtons.length - 1] < totalPages"
        @click="goToPage(totalPages)"
        class="px-4 py-2 rounded-lg font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-900 hover:to-blue-900/70 hover:text-white shadow-lg transition-all duration-300 hover:scale-105"
      >
        {{ totalPages }}
      </button>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg',
          currentPage === totalPages
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-green-900 to-blue-900/70 text-white hover:scale-105 hover:shadow-xl'
        ]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Page Info -->
    <div class="text-center text-sm">
      <span class="px-4 py-2 bg-gradient-to-r from-green-900 to-blue-900/70 text-white rounded-full shadow-lg font-medium">
        Page {{ currentPage }} sur {{ totalPages }}
      </span>
    </div>
  </div>
</template>