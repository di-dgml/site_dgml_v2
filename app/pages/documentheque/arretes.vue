<script setup lang="ts">
// Données des arrêtés
const arretes = ref([
  {
    id: 1,
    numero: 'Arrêté n°2022-3608',
    description: 'portant fixation du calendrier des travaux d’inventaire, de valorisation et d’élaboration du compte central des matières de l’Etat.',
    date: '26/12/22',
    pdfUrl: '/documents/arretes/arrete-2022-3608.pdf'
  },
  {
    id: 2,
    numero: 'Arrêté n°2022-3029',
    description: 'portant plan des comptes des matières de l’Etat.',
    date: '14/11/22',
    pdfUrl: '/documents/arretes/arrete-2022-3029.pdf'
  },
  {
    id: 3,
    numero: 'Arrêté n°2022-3028',
    description: 'portant codification, immatriculation et estampillage des matières de l’Etat.',
    date: '14/11/22',
    pdfUrl: '/documents/arretes/arrete-2022-3028.pdf'
  },
  {
    id: 4,
    numero: 'Arrêté n°2022-839',
    description: 'portant modalités de conservation, d\'emploi, d\'évaluation, d\'amortissement et de dépréciation des matières de l’Etat.',
    date: '06/04/22',
    pdfUrl: '/documents/arretes/arrete-2022-839.pdf'
  },
  {
    id: 5,
    numero: 'Arrêté n°2021-621',
    description: 'portant fixation du calendrier des travaux d’inventaire, de valorisation et d’élaboration du compte central des matières de l’Etat.',
    date: '24/03/21',
    pdfUrl: '/documents/arretes/arrete-2021-621.pdf'
  },
  {
    id: 6,
    numero: 'Arrêté n°2018-4117',
    description: 'portant fixation des règles de réception des commandes, des dons et legs des matières de l’Etat.',
    date: '31/12/18',
    pdfUrl: '/documents/arretes/arrete-2018-4117.pdf'
  },
  {
    id: 7,
    numero: 'Arrêté n°2018-3767',
    description: 'portant fixation des critères de nomination des comptables et autres acteurs de la gestion des matières de l’Etat et des autres organismes publics.',
    date: '23/04/18',
    pdfUrl: '/documents/arretes/arrete-2018-3767.pdf'
  }
])

const isDocumentOpen = ref(false)
const selectedDocument = ref(null)
const searchQuery = ref('')

// Filtrer les arrêtés par recherche
const filteredArretes = computed(() => {
  if (!searchQuery.value) return arretes.value

  const query = searchQuery.value.toLowerCase()
  return arretes.value.filter(doc =>
    doc.numero.toLowerCase().includes(query)
    || doc.description.toLowerCase().includes(query)
    || doc.date.toLowerCase().includes(query)
  )
})

const openDocument = (doc) => {
  selectedDocument.value = doc
  isDocumentOpen.value = true
}

const closeDocument = () => {
  isDocumentOpen.value = false
  selectedDocument.value = null
}

const downloadDocument = async (doc) => {
  try {
    const response = await fetch(doc.pdfUrl)
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${doc.numero}.pdf`
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()

    setTimeout(() => {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
  }
}

useSeoMeta({
  title: 'Arrêtés - Documenthèque',
  ogTitle: 'Arrêtés - Documenthèque',
  description: 'Consultez et téléchargez les arrêtés officiels',
  ogDescription: 'Consultez et téléchargez les arrêtés officiels'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section avec dégradé vert -->
    <div class="relative bg-gradient-to-br from-green-900 to-blue-900/70  dark:from-green-800 dark:via-green-900 dark:to-emerald-950 overflow-hidden pb-12">
      <!-- Motif décoratif -->
      <div class="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />

      <UContainer>
        <div class="relative py-16 text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Arrêtés
          </h1>
          <p class="text-lg md:text-xl text-green-50 max-w-2xl mx-auto mb-8">
            Consultez et téléchargez l'ensemble des arrêtés en vigueur
          </p>

          <!-- Navigation entre types de documents -->
          <div class="flex items-center justify-center gap-3 mb-8">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1.5 shadow-lg">
              <!-- Arrêtés (actif) -->
              <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-700 rounded-full font-semibold shadow-md">
                <UIcon
                  name="i-lucide-file-text"
                  class="w-4 h-4"
                />
                <span>Arrêtés</span>
              </div>

              <!-- Décrets (lien) -->
              <NuxtLink
                to="/documentheque/decrets"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-white hover:bg-white/20 rounded-full font-medium transition-all duration-200"
              >
                <UIcon
                  name="i-lucide-scroll-text"
                  class="w-4 h-4"
                />
                <span>Décrets</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Barre de recherche -->
          <div class="max-w-2xl mx-auto px-4">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              size="xl"
              placeholder="Rechercher par numéro, description ou date..."
              class="w-full"
              :ui="{
                icon: { trailing: { pointer: '' } },
                base: 'shadow-2xl bg-white dark:bg-gray-800 border-0 ring-2 ring-white/20 hover:ring-white/40 transition-all duration-200 w-full'
              }"
            >
              <template #trailing>
                <UButton
                  v-show="searchQuery !== ''"
                  color="gray"
                  variant="link"
                  icon="i-lucide-x"
                  :padded="false"
                  @click="searchQuery = ''"
                />
              </template>
            </UInput>
          </div>
        </div>
      </UContainer>
    </div>

    <UContainer>
      <!-- Grille des arrêtés -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-16">
        <div
          v-for="doc in filteredArretes"
          :key="doc.id"
          class="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <!-- Badge date en haut à droite -->
          <div class="absolute top-4 right-4 z-10">
            <span class="inline-flex items-center px-3.5 py-2 bg-gradient-to-br from-green-900 to-blue-900/70 text-white text-xs font-medium rounded-2xl shadow-lg">
              {{ doc.date }}
            </span>
          </div>

          <!-- Contenu de la carte -->
          <div class="p-5">
            <!-- En-tête avec icône et numéro -->
            <div class="flex items-start gap-4 mb-3">
              <div class="w-12 h-12 bg-gradient-to-br from-green-900 to-blue-900/70 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <UIcon
                  name="i-lucide-file-text"
                  class="w-6 h-6 text-white"
                />
              </div>

              <div class="flex-1 min-w-0 pr-20">
                <!-- Numéro de l'arrêté -->
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {{ doc.numero }}
                </h3>
                <!-- Description -->
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-4">
                  {{ doc.description }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <UButton
                label="Lire"
                icon="i-lucide-eye"
                color="green"
                size="sm"
                class="flex-1"
                @click="openDocument(doc)"
              />
              <UButton
                icon="i-lucide-download"
                color="neutral"
                variant="outline"
                size="sm"
                :to="doc.pdfUrl"
                @click.stop.prevent="downloadDocument(doc)"
              />
            </div>
          </div>

          <!-- Hover effect -->
          <div class="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      <!-- Message si aucun résultat -->
      <div
        v-if="filteredArretes.length === 0"
        class="text-center py-16"
      >
        <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <UIcon
            name="i-lucide-search-x"
            class="w-12 h-12 text-gray-400"
          />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun résultat trouvé
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          Essayez avec d'autres mots-clés
        </p>
      </div>
    </UContainer>

    <!-- Modal de lecture -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDocumentOpen"
        class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        @click.self="closeDocument"
      >
        <button
          class="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Fermer"
          @click="closeDocument"
        >
          <UIcon
            name="i-lucide-x"
            class="w-6 h-6 text-white"
          />
        </button>

        <div class="h-full flex items-center justify-center p-3 md:p-6">
          <div class="w-full max-w-5xl h-full bg-white dark:bg-gray-900 shadow-2xl overflow-hidden rounded-xl">
            <iframe
              v-if="selectedDocument"
              :src="selectedDocument.pdfUrl + '#toolbar=0&navpanes=0&scrollbar=1&view=FitH'"
              class="w-full h-full"
              frameborder="0"
              title="Visualiseur de document"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
