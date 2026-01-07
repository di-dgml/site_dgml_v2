<script setup lang="ts">
// Types
interface WordPressPost {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  link: string
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
    author?: Array<{ name: string }>
    'wp:term'?: Array<Array<{ name: string }>>
  }
}

// State
const posts = ref<WordPressPost[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const postsPerPage = 7

// Fetch posts
const fetchPosts = async (page: number = 1) => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch(
      `https://www.dgml.bj/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}`
    )
    if (!response.ok) throw new Error('Erreur lors du chargement des articles')
    
    // Récupérer le nombre total de pages depuis les headers
    const total = response.headers.get('X-WP-TotalPages')
    if (total) totalPages.value = parseInt(total)
    
    posts.value = await response.json()
    
    // Scroll to top on page change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}

// Pagination handler
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchPosts(page)
}

// Scroll to articles section
const scrollToArticles = () => {
  const articlesSection = document.getElementById('articles-section')
  if (articlesSection) {
    articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
         'https://via.placeholder.com/800x400?text=DGML'
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
  fetchPosts(1)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Header avec Carousel -->
    <div class="relative bg-gradient-to-r from-green-900 to-blue-900/70 text-white overflow-hidden">
      <!-- Pattern de fond -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <UContainer class="relative py-8 md:py-12">
        <!-- En-tête avec Badge et bouton -->
        <div class="flex justify-between items-center mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span class="text-sm font-medium">À la Une</span>
          </div>
          
          <button
            @click="scrollToArticles"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            <span class="hidden sm:inline">Voir tous les articles</span>
            <span class="sm:hidden">Articles</span>
          </button>
        </div>

        <!-- Carousel des actualités -->
        <div v-if="posts.length > 0" class="relative">
          <UCarousel
            v-slot="{ item }"
            :items="posts.slice(0, 3)"
            :ui="{
              item: 'basis-full',
              container: 'rounded-2xl'
            }"
            arrows
            :autoplay="6000"
            class="rounded-2xl overflow-hidden"
          >
            <div class="relative h-[500px] flex items-center">
              <!-- Image de fond -->
              <div class="absolute inset-0">
                <img 
                  :src="getImageUrl(item)"
                  :alt="stripHtml(item.title.rendered)"
                  class="w-full h-full object-cover"
                />
                <!-- Overlay sombre -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
              </div>

              <!-- Contenu -->
              <div class="relative z-10 w-full px-6 md:px-12 py-8">
                <div class="max-w-4xl mx-auto">
                  <!-- Catégories -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span 
                      v-for="(cat, idx) in getCategoryNames(item).slice(0, 2)"
                      :key="idx"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {{ cat }}
                    </span>
                  </div>

                  <!-- Titre -->
                  <h2 class="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg line-clamp-2">
                    {{ stripHtml(item.title.rendered) }}
                  </h2>

                  <!-- Excerpt -->
                  <p class="text-lg md:text-xl text-white/90 mb-6 line-clamp-2 drop-shadow-md">
                    {{ stripHtml(item.excerpt.rendered) }}
                  </p>

                  <!-- Métadonnées -->
                  <div class="flex items-center gap-4 text-sm text-white/80 mb-6">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{{ formatDate(item.date) }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{{ getAuthorName(item) }}</span>
                    </div>
                  </div>

                  <!-- Bouton CTA -->
                  <NuxtLink
                    :to="`/blog/${item.slug}`"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-900 hover:bg-white/90 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Lire l'article complet</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </UCarousel>
        </div>

        <!-- Titre section si pas de posts -->
        <div v-else class="text-center py-12">
          <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Actualités
          </h1>
          <p class="text-xl md:text-2xl mb-3 text-white/90 drop-shadow-md">
            Direction Générale du Matériel et de la Logistique
          </p>
        </div>
      </UContainer>

      <!-- Vague décorative en bas -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-12 md:h-16" viewBox="0 0 1440 54" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 22L60 26.3C120 30.7 240 39.3 360 39.3C480 39.3 600 30.7 720 26.3C840 22 960 22 1080 24.7C1200 27.3 1320 32.7 1380 35.3L1440 38V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" :fill="$colorMode.value === 'dark' ? '#111827' : '#f9fafb'"/>
        </svg>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-24">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300 font-medium">Chargement des articles...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center py-24">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md border border-red-200 dark:border-red-800">
        <div class="flex items-center gap-3 mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-600 font-semibold text-lg">Une erreur est survenue</p>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ error }}</p>
        <button 
          @click="fetchPosts(currentPage)"
          class="w-full px-4 py-2 bg-gradient-to-r from-green-900 to-blue-900/70 text-white rounded-lg hover:scale-105 transition-transform font-medium shadow-lg"
        >
          Réessayer
        </button>
      </div>
    </div>

    <!-- Content -->
    <div id="articles-section" v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tous les articles
        </h2>
        <div class="flex items-center justify-center gap-3">
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
      </div>

      <div v-if="posts.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-600 dark:text-gray-300 text-lg">Aucun article disponible</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Featured Post (First Post - Full Width) -->
        <article v-if="posts[0]" class="lg:col-span-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div class="lg:flex">
            <div class="lg:w-1/2">
              <img 
                :src="getImageUrl(posts[0])"
                :alt="stripHtml(posts[0].title.rendered)"
                class="w-full h-64 lg:h-full object-cover"
              />
            </div>
            <div class="lg:w-1/2 p-8">
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="(cat, idx) in getCategoryNames(posts[0])"
                  :key="idx"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {{ cat }}
                </span>
              </div>
              
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <NuxtLink 
                  :to="`/blog/${posts[0].slug}`"
                  v-html="posts[0].title.rendered"
                />
              </h2>
              
              <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                {{ stripHtml(posts[0].excerpt.rendered) }}
              </p>
              
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ formatDate(posts[0].date) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{{ getAuthorName(posts[0]) }}</span>
                </div>
              </div>
              
              <NuxtLink
                :to="`/blog/${posts[0].slug}`"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-900 to-blue-900/70 text-white rounded-lg hover:scale-105 transition-transform font-medium shadow-lg"
              >
                Lire l'article
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>

        <!-- Other Posts Grid -->
        <article 
          v-for="post in posts.slice(1)"
          :key="post.id"
          class="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img 
            :src="getImageUrl(post)"
            :alt="stripHtml(post.title.rendered)"
            class="w-full h-48 object-cover"
          />
          
          <div class="p-6">
            <div class="flex flex-wrap gap-2 mb-3">
              <span 
                v-for="(cat, idx) in getCategoryNames(post).slice(0, 2)"
                :key="idx"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {{ cat }}
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <NuxtLink 
                :to="`/blog/${post.slug}`"
                v-html="post.title.rendered"
              />
            </h3>
            
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {{ stripHtml(post.excerpt.rendered) }}
            </p>
            
            <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(post.date) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{{ getAuthorName(post) }}</span>
              </div>
            </div>
            
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
            >
              Lire la suite
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Pagination Component -->
      <Pagination 
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
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