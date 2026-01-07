<script setup lang="ts">
import { ref, onMounted } from 'vue'

const expandedNodes = ref(new Set(['dgml', 'dgaml']))

const toggleNode = (id: string) => {
  if (expandedNodes.value.has(id)) {
    expandedNodes.value.delete(id)
  } else {
    expandedNodes.value.add(id)
  }
}

const isExpanded = (id: string) => expandedNodes.value.has(id)

onMounted(() => {
  // Observer pour l'animation au scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  const elements = document.querySelectorAll('.scroll-reveal')
  elements.forEach(el => observer.observe(el))
})

// Structure de l'organigramme
const orgData = {
  id: 'dgml',
  name: 'Raoufou MAMAM',
  title: 'Directeur Général du Matériel et de la Logistique',
  subtitle: 'DGML',
  image: 'https://www.dgml.bj/wp-content/uploads/2023/07/DGML2-768x768.jpg.webp',
  children: [
    {
      id: 'dgaml',
      name: 'À définir',
      title: 'Directeur Général Adjoint',
      subtitle: 'DGAML',
      image: '',
      children: [
        {
          id: 'cciq',
          name: 'À définir',
          title: 'Chef de la Cellule Contrôle Interne de la Qualité',
          subtitle: 'CCIQ',
          image: '',
          children: []
        },
        {
          id: 'cerc',
          name: 'À définir',
          title: 'Chef de la Cellule Études, Réformes et Contentieux',
          subtitle: 'CERC',
          image: '',
          children: []
        },
        {
          id: 'dmcm',
          name: 'À définir',
          title: 'Directeur du Matériel et Comptabilité',
          subtitle: 'DMCM',
          image: '',
          children: []
        },
        {
          id: 'dpib',
          name: 'À définir',
          title: 'Directeur du Patrimoine Immobilier',
          subtitle: 'DPIB',
          image: '',
          children: []
        },
        {
          id: 'dgca',
          name: 'À définir',
          title: 'Directeur du Garage Central',
          subtitle: 'DGCA',
          image: '',
          children: []
        },
        {
          id: 'dgr',
          name: 'À définir',
          title: 'Directeur Gestion des Ressources',
          subtitle: 'DGR',
          image: '',
          children: []
        },
        {
          id: 'di',
          name: 'À définir',
          title: "Directeur de l'Informatique",
          subtitle: 'DI',
          image: '',
          children: []
        }
      ]
    }
  ]
}

// Secrétariat directement rattaché au DGML (affiché à côté)
const secretariat = {
  id: 'secretariat-dgml',
  name: 'À définir',
  title: 'Secrétariat Particulier',
  subtitle: 'Secrétariat DGML',
  image: '',
  children: []
}

const getBgColor = (level: number) => {
  if (level === 0) return 'from-[#0B5433] to-[#3a6470]'
  if (level === 1) return 'from-[#3a6470] to-[#5D73AD]'
  if (level === 2) return 'from-[#5D73AD] to-[#7B8DC4]'
  return 'from-gray-600 to-gray-700'
}

const getSize = (level: number) => {
  if (level === 0) return { img: 'w-20 h-20', text: 'text-lg', card: 'p-6' }
  if (level === 1) return { img: 'w-16 h-16', text: 'text-base', card: 'p-5' }
  if (level === 2) return { img: 'w-14 h-14', text: 'text-sm', card: 'p-4' }
  return { img: 'w-12 h-12', text: 'text-xs', card: 'p-3' }
}
</script>

<template>
  <div class="animate-fade-in">
    <UPageSection class="animate-slide-in-up pt-0">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-12 scroll-reveal">
          <!-- <div
            class="inline-flex items-center gap-3 bg-gradient-to-r from-[#0B5433] to-[#5D73AD] text-white rounded-full px-6 py-3 shadow-lg mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-sm font-semibold">Organisation</span>
          </div> -->
          <h1
            class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0B5433] to-[#5D73AD] mb-4">
            Notre Equipe
          </h1>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Direction Générale du Matériel et de la Logistique
          </p>
        </div>

        <!-- Organigramme -->
        <div class="pb-8 scroll-reveal delay-200">
          <div class="w-full">
            <!-- Niveau 1: DGML (centré) -->
            <div class="flex flex-col items-center mb-12">
              <!-- DGML -->
              <div
                :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300', getSize(0).card, 'w-full max-w-[350px]']">
                <div :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(0), 'rounded-t-xl']" />

                <div class="flex items-start gap-4 mt-2">
                  <div :class="[getSize(0).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100']">
                    <img :src="orgData.image || 'https://via.placeholder.com/150'" :alt="orgData.name"
                      class="w-full h-full object-cover">
                  </div>

                  <div class="flex-1 min-w-0">
                    <h3 :class="['font-bold text-gray-800', getSize(0).text, 'mb-1 line-clamp-2']">
                      {{ orgData.name }}
                    </h3>
                    <p class="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                      {{ orgData.title }}
                    </p>
                    <p v-if="orgData.subtitle" class="text-xs text-gray-500 italic line-clamp-1">
                      {{ orgData.subtitle }}
                    </p>
                  </div>
                </div>

                <button
                  class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-[#0B5433] hover:text-[#5D73AD] transition-colors py-2 border-t border-gray-100"
                  @click="toggleNode(orgData.id)">
                  <svg v-if="isExpanded(orgData.id)" class="w-4 h-4" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span class="font-medium">
                    {{ isExpanded(orgData.id) ? 'Masquer' : 'Voir' }} la structure
                  </span>
                </button>
              </div>

              <!-- Ligne verticale vers DGAML -->
              <div v-if="isExpanded(orgData.id)" class="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-400" />
            </div>

            <!-- Niveau 2: DGAML et Secrétariat (décalé) -->
            <div v-if="isExpanded(orgData.id)" class="relative">
              <!-- Conteneur principal -->
              <div class="flex flex-col lg:flex-row gap-12 items-start justify-center">
                <!-- Colonne gauche: Secrétariat (décalé vers le haut) -->
                <div class="lg:w-1/4 flex flex-col items-center lg:items-end">
                  <!-- Secrétariat DGML -->
                  <div class="relative mb-8 lg:mb-0 lg:mt-[-80px]">
                    <!-- Ligne diagonale du DGML vers le Secrétariat -->
                    <div
                      class="absolute top-[-50px] right-0 lg:top-[-40px] lg:right-[-120px] w-24 h-0.5 bg-gray-300 transform rotate-45 origin-right" />

                    <!-- Carte Secrétariat (plus petite) -->
                    <div
                      :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300', 'p-4', 'w-full max-w-[280px]']">
                      <div
                        :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-gray-500 to-gray-600', 'rounded-t-xl']" />

                      <div class="flex items-start gap-3 mt-2">
                        <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100">
                          <img :src="secretariat.image || 'https://via.placeholder.com/150'" :alt="secretariat.name"
                            class="w-full h-full object-cover">
                        </div>

                        <div class="flex-1 min-w-0">
                          <h3 class="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                            {{ secretariat.name }}
                          </h3>
                          <p class="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                            {{ secretariat.title }}
                          </p>
                          <p v-if="secretariat.subtitle" class="text-xs text-gray-500 italic line-clamp-1">
                            {{ secretariat.subtitle }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Colonne centre: DGAML -->
                <div class="lg:w-2/4 flex flex-col items-center">
                  <!-- DGAML -->
                  <div
                    :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300', getSize(1).card, 'w-full max-w-[320px] mb-8']">
                    <div :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(1), 'rounded-t-xl']" />

                    <div class="flex items-start gap-4 mt-2">
                      <div :class="[getSize(1).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100']">
                        <img :src="orgData.children[0].image || 'https://via.placeholder.com/150'"
                          :alt="orgData.children[0].name" class="w-full h-full object-cover">
                      </div>

                      <div class="flex-1 min-w-0">
                        <h3 :class="['font-bold text-gray-800', getSize(1).text, 'mb-1 line-clamp-2']">
                          {{ orgData.children[0].name }}
                        </h3>
                        <p class="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                          {{ orgData.children[0].title }}
                        </p>
                        <p v-if="orgData.children[0].subtitle" class="text-xs text-gray-500 italic line-clamp-1">
                          {{ orgData.children[0].subtitle }}
                        </p>
                      </div>
                    </div>

                    <button v-if="orgData.children[0].children && orgData.children[0].children.length > 0"
                      class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-[#0B5433] hover:text-[#5D73AD] transition-colors py-2 border-t border-gray-100"
                      @click="toggleNode(orgData.children[0].id)">
                      <svg v-if="isExpanded(orgData.children[0].id)" class="w-4 h-4" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span class="font-medium">
                        {{ isExpanded(orgData.children[0].id) ? 'Masquer' : 'Voir' }} {{
                          orgData.children[0].children.length }} directions
                      </span>
                    </button>
                  </div>

                  <!-- Ligne vers les directions -->
                  <div v-if="isExpanded(orgData.children[0].id)"
                    class="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400" />
                </div>

                <!-- Colonne droite: espace vide pour équilibre -->
                <div class="lg:w-1/4 hidden lg:block" />
              </div>

              <!-- Niveau 3: Les 7 directions (sous DGAML) -->
              <div
                v-if="isExpanded(orgData.children[0].id) && orgData.children[0].children && orgData.children[0].children.length > 0"
                class="mt-8">
                <!-- Ligne horizontale au-dessus des directions -->
                <div class="flex justify-center mb-8">
                  <div class="w-0.5 h-4 bg-gray-300" />
                </div>

                <!-- Grille des 7 directions -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <!-- 6 directions sur 2 lignes -->
                  <div v-for="(direction, index) in orgData.children[0].children.slice(0, 6)" :key="direction.id"
                    class="flex justify-center">
                    <!-- Ligne verticale vers chaque direction -->
                    <div class="absolute top-[-20px] left-1/2 w-0.5 h-4 bg-gray-300 transform -translate-x-1/2" />

                    <!-- Carte Direction -->
                    <div
                      :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full', getSize(2).card]">
                      <div :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(2), 'rounded-t-xl']" />

                      <div class="flex items-start gap-3 mt-2">
                        <div
                          :class="[getSize(2).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100']">
                          <img :src="direction.image || 'https://via.placeholder.com/150'" :alt="direction.name"
                            class="w-full h-full object-cover">
                        </div>

                        <div class="flex-1 min-w-0">
                          <h3 :class="['font-bold text-gray-800', getSize(2).text, 'mb-1 line-clamp-2']">
                            {{ direction.name }}
                          </h3>
                          <p class="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                            {{ direction.title }}
                          </p>
                          <p v-if="direction.subtitle" class="text-xs text-gray-500 italic line-clamp-1">
                            {{ direction.subtitle }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 7ème direction centrée en bas -->
                  <div class="sm:col-span-2 lg:col-span-3 xl:col-span-4 flex justify-center mt-6">
                    <div class="relative">
                      <!-- Ligne verticale -->
                      <div class="absolute top-[-20px] left-1/2 w-0.5 h-4 bg-gray-300 transform -translate-x-1/2" />

                      <!-- Carte de la 7ème direction -->
                      <div
                        :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300', getSize(2).card, 'w-full max-w-[300px]']">
                        <div
                          :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(2), 'rounded-t-xl']" />

                        <div class="flex items-start gap-3 mt-2">
                          <div
                            :class="[getSize(2).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100']">
                            <img :src="orgData.children[0].children[6].image || 'https://via.placeholder.com/150'"
                              :alt="orgData.children[0].children[6].name" class="w-full h-full object-cover">
                          </div>

                          <div class="flex-1 min-w-0">
                            <h3 :class="['font-bold text-gray-800', getSize(2).text, 'mb-1 line-clamp-2']">
                              {{ orgData.children[0].children[6].name }}
                            </h3>
                            <p class="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                              {{ orgData.children[0].children[6].title }}
                            </p>
                            <p v-if="orgData.children[0].children[6].subtitle"
                              class="text-xs text-gray-500 italic line-clamp-1">
                              {{ orgData.children[0].children[6].subtitle }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Légende -->
        <div class="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-6 scroll-reveal delay-400">
          <h3 class="text-lg font-bold text-gray-800 mb-4">
            Légende
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-3 bg-gradient-to-r from-[#0B5433] to-[#3a6470] rounded" />
              <span class="text-sm text-gray-600">Direction Générale</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-3 bg-gradient-to-r from-[#3a6470] to-[#5D73AD] rounded" />
              <span class="text-sm text-gray-600">Direction Générale Adjointe</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-3 bg-gradient-to-r from-[#5D73AD] to-[#7B8DC4] rounded" />
              <span class="text-sm text-gray-600">Directions Opérationnelles</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded" />
              <span class="text-sm text-gray-600">Secrétariat</span>
            </div>
          </div>
        </div>
      </div>
    </UPageSection>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease-in-out;
}

.animate-slide-in-up {
  animation: slideInUp 1s ease-out;
}

/* Animation de révélation au scroll */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-200 {
  transition-delay: 0.2s;
}

.delay-400 {
  transition-delay: 0.4s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Styles pour les cartes */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Lignes de connexion */
.connection-line {
  position: relative;
}

.connection-line::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  width: 2px;
  height: 20px;
  background: #d1d5db;
  transform: translateX(-50%);
}

/* Responsive */
@media (max-width: 1024px) {
  .lg\:mt-\[-80px\] {
    margin-top: -40px;
  }

  .lg\:right-\[-120px\] {
    right: -60px;
  }
}

@media (max-width: 768px) {
  .grid-cols-1.sm\:grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .sm\:col-span-2 {
    grid-column: span 1;
  }
}
</style>