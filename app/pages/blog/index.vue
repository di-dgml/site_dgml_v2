<script setup lang="ts">
// Types
interface WordPressPost {
  id: number
  date: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  link: string
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
    'author'?: Array<{ name: string }>
    'wp:term'?: Array<Array<{ name: string }>>
  }
}

// State
const posts = ref<WordPressPost[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch posts
const fetchPosts = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('https://www.dgml.bj/wp-json/wp/v2/posts?_embed&per_page=10')
    if (!response.ok) throw new Error('Erreur lors du chargement des articles')
    posts.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}

// Utility functions
const stripHtml = (html: string): string => {
  if (typeof document !== 'undefined') {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
  return html.replace(/<[^>]*>/g, '')
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getImageUrl = (post: WordPressPost): string => {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url
    || 'https://via.placeholder.com/800x400?text=DGML'
}

const getAuthorName = (post: WordPressPost): string => {
  return post._embedded?.author?.[0]?.name || 'DGML'
}

const getCategoryNames = (post: WordPressPost): string[] => {
  return post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || []
}

// SEO
useSeoMeta({
  title: 'Actualités DGML - Direction Générale du Matériel et de la Logistique',
  ogTitle: 'Actualités DGML',
  description: 'Retrouvez toutes les actualités de la Direction Générale du Matériel et de la Logistique du Bénin',
  ogDescription: 'Retrouvez toutes les actualités de la Direction Générale du Matériel et de la Logistique du Bénin'
})

// Lifecycle
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <!-- Header -->
    <div class="bg-white shadow-md border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Actualités DGML
        </h1>
        <p class="text-lg text-gray-600">
          Direction Générale du Matériel et de la Logistique
        </p>
        <p class="text-sm text-gray-500 mt-1">
          Préserver et entretenir le bien public
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-24"
    >
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p class="mt-4 text-gray-600">
          Chargement des articles...
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center py-24"
    >
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <p class="text-red-600 font-semibold">
          Erreur: {{ error }}
        </p>
        <button
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          @click="fetchPosts"
        >
          Réessayer
        </button>
      </div>
    </div>

    <!-- Content -->
    <div
      v-else
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div
        v-if="posts.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-600">
          Aucun article disponible
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <!-- Featured Post (First Post - Full Width) -->
        <article
          v-if="posts[0]"
          class="lg:col-span-12 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="lg:flex">
            <div class="lg:w-1/2">
              <img
                :src="getImageUrl(posts[0])"
                :alt="stripHtml(posts[0].title.rendered)"
                class="w-full h-64 lg:h-full object-cover"
              >
            </div>
            <div class="lg:w-1/2 p-8">
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="(cat, idx) in getCategoryNames(posts[0])"
                  :key="idx"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <svg
                    class="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {{ cat }}
                </span>
              </div>

              <h2 class="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                <a
                  :href="posts[0].link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ stripHtml(posts[0].title.rendered) }}
                </a>
              </h2>

              <p class="text-gray-600 mb-6 line-clamp-3">
                {{ stripHtml(posts[0].excerpt.rendered) }}
              </p>

              <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div class="flex items-center gap-1">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{{ formatDate(posts[0].date) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{{ getAuthorName(posts[0]) }}</span>
                </div>
              </div>

              <a
                :href="posts[0].link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Lire l'article
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Other Posts Grid -->
        <article
          v-for="post in posts.slice(1)"
          :key="post.id"
          class="lg:col-span-4 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            :src="getImageUrl(post)"
            :alt="stripHtml(post.title.rendered)"
            class="w-full h-48 object-cover"
          >

          <div class="p-6">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="(cat, idx) in getCategoryNames(post).slice(0, 2)"
                :key="idx"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                <svg
                  class="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {{ cat }}
              </span>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
              <a
                :href="post.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ stripHtml(post.title.rendered) }}
              </a>
            </h3>

            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ stripHtml(post.excerpt.rendered) }}
            </p>

            <div class="flex items-center gap-3 text-xs text-gray-500 mb-4">
              <div class="flex items-center gap-1">
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ formatDate(post.date) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{{ getAuthorName(post) }}</span>
              </div>
            </div>

            <a
              :href="post.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              Lire la suite
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p class="text-gray-600">
          Direction Générale du Matériel et de la Logistique - République du Bénin
        </p>
        <a
          href="https://www.dgml.bj"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
        >
          www.dgml.bj
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
