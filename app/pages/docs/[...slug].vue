<!-- pages/index.vue -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <UContainer class="py-2">
      <UCard :ui="{ background: 'bg-gradient-to-r from-green-900 to-blue-900', rounded: 'rounded-3xl', shadow: 'shadow-2xl' }">
        <div class="relative h-96 flex items-center justify-center rounded-2xl overflow-hidden">
          <!-- Carousel Background -->
          <UCarousel
            v-slot="{ item }"
            :items="heroImages"
            :ui="{
              item: 'basis-full',
              container: 'rounded-2xl'
            }"
            class="absolute inset-0"
            arrows
            :autoplay="5000"
          >
            <NuxtImg
              :src="item.url"
              :alt="item.alt"
              class="w-full h-full object-cover"
              draggable="false"
            />
          </UCarousel>
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70 z-10" />
          
          <!-- Content -->
          <div class="relative z-20 text-center text-white px-4">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Direction générale du Matériel et de la Logistique
            </h1>
            <p class="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Préserver et Entretenir le bien public
            </p>
          </div>
        </div>

        <!-- Quick Access Cards -->
        <div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 -mt-20 relative z-20">
            <UCard
              v-for="(item, i) in quickAccess"
              :key="i"
              :ui="{ 
                background: 'bg-white',
                shadow: 'shadow-lg hover:shadow-xl',
                rounded: 'rounded-xl'
              }"
              class="cursor-pointer transform hover:-translate-y-1 transition"
            >
              <NuxtImg
                :src="`https://picsum.photos/300/200?random=${i + 10}`"
                :alt="item"
                class="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 class="text-center font-semibold text-gray-800">{{ item }}</h3>
            </UCard>
          </div>
        </div>
      </UCard>
    </UContainer>

    <!-- Actualités Section -->
    <section class="pt-16 m-8 bg-gradient-to-r from-green-900 to-blue-900/70 rounded-3xl">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">Dernières Actualités</h2>
          <p class="text-blue-100 max-w-2xl mx-auto">
            Restez informé des dernières nouvelles et événements
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
          <UCard
            v-for="(news, i) in actualites"
            :key="i"
            :ui="{
              background: 'bg-white',
              rounded: 'rounded-2xl',
              shadow: 'shadow-xl'
            }"
            class="hover:scale-105 transition transform cursor-pointer"
          >
            <NuxtImg
              :src="`https://picsum.photos/400/250?random=${i + 30}`"
              :alt="news.title"
              class="w-full h-48 object-cover rounded-xl mb-4"
            />
            <UBadge :color="news.badge.color" variant="soft" class="mb-3">
              {{ news.badge.text }}
            </UBadge>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ news.title }}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{{ news.description }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                {{ news.date }}
              </span>
              <UButton variant="link" size="sm" trailing-icon="i-heroicons-arrow-right">
                Lire plus
              </UButton>
            </div>
          </UCard>
        </div>
        <div class="text-center text-white pb-8">
          <UButton
            size="xl"
            color="white"
            variant="solid"
            trailing-icon="i-heroicons-newspaper"
            :ui="{ rounded: 'rounded-full' }"
          >
            Voir toutes les actualités
          </UButton>
        </div>
      </UContainer>
    </section>

    <!-- Stats Section -->
    <section class="py-16 my-8 mx-8">
      <UContainer>
        <UCard :ui="{ background: 'bg-white/95 backdrop-blur-sm', rounded: 'rounded-3xl', shadow: 'shadow-2xl' }">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-4xl font-bold text-gray-800 mb-2">
                Certifiée ISO 9001
              </h2>
              <p class="text-gray-600">
                Une certification qui témoigne de notre engagement
              </p>
            </div>
            <NuxtImg
              src="https://picsum.photos/400/300?random=office"
              alt="Office"
              class="hidden lg:block w-64 h-48 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </UCard>
      </UContainer>
    </section>

    <!-- Image Carousel -->
    <section class="py-16 m-8 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-400 rounded-3xl relative">
      <UContainer>
        <!-- Header Card positioned at top center -->
        <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-11/12 max-w-5xl z-20">
          <UCard class="bg-gradient-to-r from-blue-900 to-green-900" :ui="{ 
            background: 'bg-gradient-to-r from-blue-700 via-teal-600 to-green-600', 
            rounded: 'rounded-3xl', 
            shadow: 'shadow-2xl' 
          }">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">
              <div class="flex items-center gap-6">
                <!-- Logo/Icon -->
                <div class="bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-6 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-photo" class="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <!-- Title -->
                <div class="text-white">
                  <h2 class="text-2xl md:text-4xl font-bold mb-2">
                    Galerie Photos et Vidéos
                  </h2>
                  <p class="text-sm md:text-lg text-blue-100">
                    Découvrez nos réalisations en images
                  </p>
                </div>
              </div>
              <!-- Action Buttons -->
              <div class="flex gap-3">
                <UButton
                  size="lg"
                  color="yellow"
                  variant="solid"
                  icon="i-heroicons-eye"
                  :ui="{ rounded: 'rounded-lg' }"
                >
                  VOIR
                </UButton>
                <UButton
                  size="lg"
                  color="white"
                  variant="outline"
                  icon="i-heroicons-arrow-down-tray"
                  :ui="{ rounded: 'rounded-lg' }"
                >
                  TÉLÉCHARGER
                </UButton>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Carousel Content with top padding -->
        <div class="pt-20 md:pt-24">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              Photos récentes
            </h3>
            <UButton
              size="lg"
              color="white"
              variant="solid"
              trailing-icon="i-heroicons-eye"
              :ui="{ rounded: 'rounded-full' }"
            >
              TOUTES LES IMAGES
            </UButton>
          </div>
          
          <UCarousel
            v-slot="{ item }"
            :items="carouselImages"
            :ui="{
              item: 'basis-full',
              container: 'rounded-2xl'
            }"
            class="rounded-2xl overflow-hidden"
            arrows
            :autoplay="4000"
          >
            <NuxtImg
              :src="item.url"
              :alt="item.title"
              class="w-full h-96 object-cover"
              draggable="false"
            />
          </UCarousel>
        </div>
      </UContainer>
    </section>

    <!-- Plaintes & Certifications Section -->
    <section id="plaintes">
      <UContainer>
        <div class="gap-8">
          <!-- Plaintes -->
          <UCard :ui="{ background: 'bg-white/95 backdrop-blur-sm', rounded: 'rounded-3xl', shadow: 'shadow-2xl' }">
            <div class="flex items-center gap-3 mb-6">
              <UBadge color="red" variant="solid" size="lg" class="p-3">
                <UIcon name="i-heroicons-exclamation-circle" class="w-8 h-8" />
              </UBadge>
              <h3 class="text-3xl font-bold text-gray-800">
                Déposer une Plainte
              </h3>
            </div>
            <NuxtImg
              src="https://picsum.photos/500/300?random=complaint"
              alt="Plainte"
              class="w-full h-48 object-cover rounded-xl mb-6"
            />
            <p class="text-gray-600 mb-6">
              Votre voix compte. Signalez tout problème ou préoccupation de manière sécurisée et confidentielle.
            </p>
            <UButton
              block
              size="lg"
              color="red"
              :ui="{ rounded: 'rounded-lg' }"
              @click="openComplaintModal"
            >
              Soumettre une Plainte
            </UButton>
          </UCard>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const isComplaintModalOpen = ref(false)
const isCertificationModalOpen = ref(false)

const heroImages = ref([
  { id: 1, url: 'https://picsum.photos/1200/400?random=hero1', alt: 'Bâtiment administratif' },
  { id: 2, url: 'https://picsum.photos/1200/400?random=hero2', alt: 'Parc automobile' },
  { id: 3, url: 'https://picsum.photos/1200/400?random=hero3', alt: 'Personnel en action' },
  { id: 4, url: 'https://picsum.photos/1200/400?random=hero4', alt: 'Infrastructure moderne' },
  { id: 5, url: 'https://picsum.photos/1200/400?random=hero5', alt: 'Service public' }
])

const quickAccess = [
  'Gestion et entretien des biens meubles et bâtiments administratifs',
  'Gestion du parc automobile et autres équipements motorisés de l\'Etat',
  'Comptabilité des matières et centralisation des comptes des matières',
]

const actualites = [
  {
    title: 'Nouvelle politique de gestion du parc automobile',
    description: 'Le ministère annonce de nouvelles mesures pour optimiser la gestion et l\'entretien du parc automobile de l\'État.',
    date: '15 Déc 2024',
    badge: { text: 'Annonce', color: 'blue' }
  },
  {
    title: 'Rénovation des bâtiments administratifs',
    description: 'Lancement du programme de rénovation des infrastructures publiques dans 12 régions du pays.',
    date: '12 Déc 2024',
    badge: { text: 'Projet', color: 'green' }
  },
  {
    title: 'Formation du personnel technique',
    description: 'Session de formation intensive pour le personnel en charge de la maintenance et de la logistique.',
    date: '10 Déc 2024',
    badge: { text: 'Formation', color: 'orange' }
  }
]

const carouselImages = ref([
  { id: 1, url: 'https://picsum.photos/800/400?random=1', title: 'Image 1' },
  { id: 2, url: 'https://picsum.photos/800/400?random=2', title: 'Image 2' },
  { id: 3, url: 'https://picsum.photos/800/400?random=3', title: 'Image 3' },
  { id: 4, url: 'https://picsum.photos/800/400?random=4', title: 'Image 4' },
  { id: 5, url: 'https://picsum.photos/800/400?random=5', title: 'Image 5' }
])

const openComplaintModal = () => {
  isComplaintModalOpen.value = true
}

const openCertificationModal = () => {
  isCertificationModalOpen.value = true
}

const submitComplaint = (formData: any) => {
  console.log('Plainte soumise:', formData)
  isComplaintModalOpen.value = false
}
</script>