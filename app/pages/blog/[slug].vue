<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const isOpen = ref(false)
const selectedImage = ref('')

// Fonction pour décoder les entités HTML
const decodeHtmlEntities = (text: string): string => {
  if (typeof document === 'undefined') return text
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

// Fonction pour nettoyer le HTML
const stripHtml = (html: string): string => {
  if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, '')
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// Fonction pour extraire les images du contenu
const extractImagesFromContent = (html: string) => {
  if (typeof document === 'undefined') return { cleanHtml: html, images: [] }
  
  const div = document.createElement('div')
  div.innerHTML = html
  
  // Extraire toutes les images
  const images = Array.from(div.querySelectorAll('img'))
  const imageData = images.map(img => ({
    url: img.getAttribute('src') || '',
    alt: img.getAttribute('alt') || 'Image'
  })).filter(img => img.url && img.url.trim() !== '')
  
  // Retirer les images du contenu et leurs conteneurs vides
  images.forEach(img => {
    const parent = img.parentElement
    if (parent) {
      // Si le parent ne contient que l'image, supprimer le parent
      if (parent.children.length === 1 && parent.textContent?.trim() === '') {
        parent.remove()
      } else {
        // Sinon, juste supprimer l'image
        img.remove()
      }
    } else {
      img.remove()
    }
  })
  
  // Nettoyer les paragraphes et divs vides
  const emptyElements = div.querySelectorAll('p:empty, div:empty, figure:empty, span:empty')
  emptyElements.forEach(el => el.remove())
  
  // Nettoyer les éléments qui ne contiennent que des espaces
  const allElements = div.querySelectorAll('*')
  allElements.forEach(el => {
    if (el.children.length === 0 && (!el.textContent || el.textContent.trim() === '')) {
      el.remove()
    }
  })
  
  return {
    cleanHtml: div.innerHTML,
    images: imageData
  }
}

const openLightbox = (url: string) => {
  selectedImage.value = url
  isOpen.value = true
}

// Récupération de l'article
const { data: wpPosts, error: fetchError } = await useFetch(
  `https://www.dgml.bj/wp-json/wp/v2/posts?slug=${slug}&_embed=1`
)

if (fetchError.value || !wpPosts.value || wpPosts.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Article non trouvé', fatal: true })
}

const wpPost = wpPosts.value[0]

// Récupération des articles reliés (même catégorie)
const { data: relatedPosts } = await useFetch(
  `https://www.dgml.bj/wp-json/wp/v2/posts?categories=${wpPost.categories?.[0] || ''}&exclude=${wpPost.id}&per_page=3&_embed=1`
)

const contentData = computed(() => extractImagesFromContent(wpPost.content.rendered))

const post = computed(() => ({
  title: decodeHtmlEntities(stripHtml(wpPost.title.rendered)),
  description: decodeHtmlEntities(stripHtml(wpPost.excerpt.rendered)),
  content: contentData.value.cleanHtml,
  images: contentData.value.images,
  date: wpPost.date,
  imageUrl: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
  author: wpPost._embedded?.author?.[0]?.name || 'DGML',
  categories: wpPost._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [],
  tags: wpPost._embedded?.['wp:term']?.[1]?.map((tag: any) => tag.name) || [],
  badge: {
    label: wpPost.categories?.includes(3) ? 'Important' : 'Info',
    color: wpPost.categories?.includes(3) ? 'red' : 'blue'
  }
}))

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
}

const getRelatedImageUrl = (post: any) => {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/400x300?text=DGML'
}

const getRelatedTitle = (post: any) => {
  return decodeHtmlEntities(stripHtml(post.title.rendered))
}

const getRelatedExcerpt = (post: any) => {
  return decodeHtmlEntities(stripHtml(post.excerpt.rendered))
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header avec image de couverture -->
    <div class="relative h-[50vh] flex items-end overflow-hidden bg-slate-900">
       <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" class="absolute inset-0 w-full h-full object-cover opacity-50" />
       <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
       
       <UContainer class="relative z-10 pb-12">
         <UBadge :label="post.badge.label" :color="post.badge.color" variant="subtle" class="mb-4" />
         <h1 class="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">{{ post.title }}</h1>
         <p class="mt-4 text-white/90 flex flex-wrap gap-4 text-sm">
           <span class="flex items-center gap-2">
             <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
             {{ formatDate(post.date) }}
           </span>
           <span class="border-l border-white/20 pl-4 flex items-center gap-2">
             <UIcon name="i-heroicons-user" class="w-4 h-4" />
             {{ post.author }}
           </span>
         </p>
       </UContainer>
    </div>

    <UContainer class="py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Contenu principal -->
        <div class="lg:col-span-8">
          <article class="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100 dark:border-gray-800">
            <!-- Description -->
            <div v-if="post.description" class="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-600">
              <p class="text-lg text-gray-700 dark:text-gray-300 italic">
                {{ post.description }}
              </p>
            </div>

            <!-- Contenu avec images organisées -->
            <div 
              v-html="post.content" 
              class="prose prose-lg dark:prose-invert max-w-none
                     prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                     prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                     prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                     prose-ul:list-disc prose-ol:list-decimal
                     prose-li:text-gray-700 dark:prose-li:text-gray-300" 
            >
          </div>
          </article>

          <!-- Galerie d'images -->
          <div v-if="post.images && post.images.length > 0" class="mt-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-6 md:p-8 border border-gray-100 dark:border-gray-800">
            <h3 class="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <UIcon name="i-heroicons-photo" class="w-6 h-6" />
              Galerie d'images ({{ post.images.length }})
            </h3>
            
            <!-- Grille responsive selon le nombre d'images -->
            <div :class="[
              'grid gap-4',
              post.images.length === 1 ? 'grid-cols-1' : 
              post.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
              'grid-cols-2 md:grid-cols-3'
            ]">
              <div 
                v-for="(img, index) in post.images" 
                :key="index"
                class="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer"
                :class="post.images.length === 1 ? 'aspect-video' : 'aspect-square'"
                @click="openLightbox(img.url)"
              >
                <img 
                  :src="img.url" 
                  :alt="img.alt"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <UIcon name="i-heroicons-magnifying-glass-plus" class="text-white w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons de partage -->
          <div class="mt-8 bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 class="font-bold mb-4 text-sm uppercase tracking-widest text-gray-500">Partager cet article</h4>
            <div class="flex gap-3">
              <UButton 
                color="blue" 
                variant="soft" 
                icon="i-simple-icons-facebook"
                size="lg"
              >
                Facebook
              </UButton>
              <UButton 
                color="sky" 
                variant="soft" 
                icon="i-simple-icons-twitter"
                size="lg"
              >
                Twitter
              </UButton>
              <UButton 
                color="blue" 
                variant="soft" 
                icon="i-simple-icons-linkedin"
                size="lg"
              >
                LinkedIn
              </UButton>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Catégories -->
          <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 class="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500 flex items-center gap-2">
              <UIcon name="i-heroicons-folder" />
              Catégories
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="cat in post.categories" 
                :key="cat" 
                class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
              >
                {{ cat }}
              </span>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="post.tags.length > 0" class="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 class="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500 flex items-center gap-2">
              <UIcon name="i-heroicons-tag" />
              Tags
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in post.tags" 
                :key="tag" 
                class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Navigation -->
          <div class="bg-gradient-to-br from-green-900 to-blue-900 rounded-3xl p-6 text-white shadow-sm">
            <h4 class="font-bold mb-4 uppercase text-xs tracking-widest">Navigation</h4>
            <div class="space-y-3">
              <NuxtLink
                to="/blog"
                class="flex items-center gap-2 hover:translate-x-1 transition-transform"
              >
                <UIcon name="i-heroicons-arrow-left" />
                Retour aux actualités
              </NuxtLink>
              <NuxtLink
                to="/"
                class="flex items-center gap-2 hover:translate-x-1 transition-transform"
              >
                <UIcon name="i-heroicons-home" />
                Accueil
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles reliés -->
      <div v-if="relatedPosts && relatedPosts.length > 0" class="mt-16">
        <div class="flex items-center gap-3 mb-8">
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white">Articles reliés</h3>
          <div class="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="related in relatedPosts"
            :key="related.id"
            class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="getRelatedImageUrl(related)"
                :alt="getRelatedTitle(related)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                <span>{{ formatDate(related.date) }}</span>
              </div>
              
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <NuxtLink :to="`/blog/${related.slug}`">
                  {{ getRelatedTitle(related) }}
                </NuxtLink>
              </h4>
              
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {{ getRelatedExcerpt(related) }}
              </p>
              
              <NuxtLink
                :to="`/blog/${related.slug}`"
                class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
              >
                Lire l'article
                <UIcon name="i-heroicons-arrow-right" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style>
/* Styles pour le contenu WordPress */
.prose p {
  margin-bottom: 1.5rem;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose ul,
.prose ol {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.prose li {
  margin: 0.5rem 0;
}

/* Supprimer complètement les images du prose */
.prose img,
.prose figure {
  display: none !important;
}

/* Supprimer les espaces vides causés par les images supprimées */
.prose p:empty,
.prose div:empty {
  display: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.prose table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
}

.prose th,
.prose td {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
}

.prose th {
  background-color: #f3f4f6;
  font-weight: 600;
}

.dark .prose th {
  background-color: #1f2937;
  border-color: #374151;
}

.dark .prose td {
  border-color: #374151;
}

/* Effet de line-clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>