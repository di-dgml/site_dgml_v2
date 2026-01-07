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
      id: 'secretariat-dgml',
      name: 'Secrétariat Particulier',
      title: 'Secrétariat DGML',
      subtitle: 'Rattaché directement au DGML',
      image: '',
      children: []
    },
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
          children: [
            {
              id: 'smr',
              name: 'Service de Maîtrise des Risques',
              title: 'SMR',
              children: [
                { id: 'dmcr', name: 'Division Cartographie des Risques', title: 'DMCR', children: [] },
                { id: 'dsr', name: 'Division Surveillance et Revue', title: 'DSR', children: [] }
              ]
            },
            {
              id: 'ssrc',
              name: 'Service Suivi des Normes et Qualité',
              title: 'SSRC',
              children: [
                { id: 'dsn', name: 'Division Suivi des Normes', title: 'DSN', children: [] },
                { id: 'dq', name: 'Division de la Qualité', title: 'DQ', children: [] }
              ]
            }
          ]
        },
        {
          id: 'cerc',
          name: 'À définir',
          title: 'Chef de la Cellule Études, Réformes et Contentieux',
          subtitle: 'CERC',
          image: '',
          children: [
            {
              id: 'ser',
              name: 'Service des Études et Réformes',
              title: 'SER',
              children: [
                { id: 'drgba', name: 'Division Réformes Bâtiments', title: 'DRGBA', children: [] },
                { id: 'drcm', name: 'Division Réformes Comptabilité', title: 'DRCM', children: [] },
                { id: 'drgem', name: 'Division Réformes Équipements', title: 'DRGEM', children: [] }
              ]
            },
            {
              id: 'spc',
              name: 'Service Plaintes et Contentieux',
              title: 'SPC',
              children: []
            }
          ]
        },
        {
          id: 'dmcm',
          name: 'À définir',
          title: 'Directeur du Matériel et Comptabilité',
          subtitle: 'DMCM',
          image: '',
          children: [
            {
              id: 'sgmm',
              name: 'Service Gestion Matériels',
              title: 'SGMM',
              children: [
                { id: 'damm', name: 'Division Acquisitions', title: 'DAMM', children: [] },
                { id: 'drmm', name: 'Division Réforme', title: 'DRMM', children: [] }
              ]
            },
            {
              id: 'scm',
              name: 'Service Comptabilité Matières',
              title: 'SCM',
              children: [
                { id: 'dstcm', name: 'Division Suivi Comptabilité', title: 'DSTCM', children: [] },
                { id: 'dinv', name: 'Division Inventaires', title: 'DInv', children: [] },
                { id: 'dfat', name: 'Division Formations', title: 'DFAT', children: [] }
              ]
            }
          ]
        },
        {
          id: 'dpib',
          name: 'À définir',
          title: 'Directeur du Patrimoine Immobilier',
          subtitle: 'DPIB',
          image: '',
          children: [
            {
              id: 'str',
              name: 'Service des Travaux',
              title: 'STr',
              children: [
                { id: 'drba', name: 'Division Réfections', title: 'DRBA', children: [] },
                { id: 'drl', name: 'Division Réparations', title: 'DRL', children: [] },
                { id: 'deat', name: 'Division Études Technique', title: 'DEAT', children: [] }
              ]
            },
            {
              id: 'sbe',
              name: 'Service Bâtiments État',
              title: 'SBE',
              children: [
                { id: 'dgbe', name: 'Division Gestion Bâtiments', title: 'DGBE', children: [] },
                { id: 'dpse', name: 'Division Prospection Sites', title: 'DPSE', children: [] }
              ]
            }
          ]
        },
        {
          id: 'dgca',
          name: 'À définir',
          title: 'Directeur du Garage Central',
          subtitle: 'DGCA',
          image: '',
          children: [
            {
              id: 'set',
              name: 'Service Études Techniques',
              title: 'SET',
              children: [
                { id: 'des', name: 'Division Études Statistiques', title: 'DES', children: [] },
                { id: 'dal', name: 'Division Acquisitions', title: 'DAL', children: [] }
              ]
            },
            {
              id: 'spca',
              name: 'Service Parc Central',
              title: 'SPCA',
              children: [
                { id: 'dvpc', name: 'Division Véhicules', title: 'DVPC', children: [] },
                { id: 'dspsr', name: 'Division Suivi Parcs', title: 'DSPSR', children: [] }
              ]
            }
          ]
        },
        {
          id: 'dgr',
          name: 'À définir',
          title: 'Directeur Gestion des Ressources',
          subtitle: 'DGR',
          image: '',
          children: [
            {
              id: 'sap',
              name: 'Service Administratif Personnel',
              title: 'SAP',
              children: [
                { id: 'dsa', name: 'Division Secrétariat', title: 'DSA', children: [] },
                { id: 'druc', name: 'Division Relations Usagers', title: 'DRU/C', children: [] },
                { id: 'dgp', name: 'Division Gestion Personnel', title: 'DGP', children: [] }
              ]
            },
            {
              id: 'sbc',
              name: 'Service Budget Comptabilité',
              title: 'SBC',
              children: [
                { id: 'dpseb', name: 'Division Budget', title: 'DPSEB', children: [] },
                { id: 'ddb', name: 'Division Dépenses Bâtiments', title: 'DDB', children: [] }
              ]
            }
          ]
        },
        {
          id: 'di',
          name: 'À définir',
          title: 'Directeur de l\'Informatique',
          subtitle: 'DI',
          image: '',
          children: [
            {
              id: 'sglabd',
              name: 'Service Génie Logiciel',
              title: 'SGLABD',
              children: [
                { id: 'ded', name: 'Division Études Documentation', title: 'DED', children: [] },
                { id: 'dd', name: 'Division Développement', title: 'DD', children: [] }
              ]
            },
            {
              id: 'seon',
              name: 'Service Exploitation Numérique',
              title: 'SEON',
              children: [
                { id: 'def', name: 'Division Études Formations', title: 'DEF', children: [] },
                { id: 'dds', name: 'Division Déploiement', title: 'DDS', children: [] }
              ]
            }
          ]
        }
      ]
    }
  ]
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
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 scroll-reveal">
          <div class="inline-flex items-center gap-3 bg-gradient-to-r from-[#0B5433] to-[#5D73AD] text-white rounded-full px-6 py-3 shadow-lg mb-6">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="text-sm font-semibold">Organisation</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0B5433] to-[#5D73AD] mb-4">
            Organigramme de la DGML
          </h1>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Direction Générale du Matériel et de la Logistique
          </p>
        </div>

        <!-- Organigramme -->
        <div class="overflow-x-auto pb-8 scroll-reveal delay-200">
          <div class="min-w-max flex justify-center">
            <!-- Fonction récursive pour afficher les noeuds -->
            <div class="flex flex-col items-center">
              <!-- DGML (niveau 0) -->
              <div :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300', getSize(0).card, 'min-w-[280px] max-w-[320px]']">
                <div :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(0), 'rounded-t-xl']" />

                <div class="flex items-start gap-4 mt-2">
                  <div :class="[getSize(0).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100']">
                    <img
                      :src="orgData.image || 'https://via.placeholder.com/150'"
                      :alt="orgData.name"
                      class="w-full h-full object-cover"
                    >
                  </div>

                  <div class="flex-1 min-w-0">
                    <h3 :class="['font-bold text-gray-800', getSize(0).text, 'mb-1 line-clamp-2']">
                      {{ orgData.name }}
                    </h3>
                    <p class="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                      {{ orgData.title }}
                    </p>
                    <p
                      v-if="orgData.subtitle"
                      class="text-xs text-gray-500 italic line-clamp-1"
                    >
                      {{ orgData.subtitle }}
                    </p>
                  </div>
                </div>

                <button
                  class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-[#0B5433] hover:text-[#5D73AD] transition-colors py-2 border-t border-gray-100"
                  @click="toggleNode(orgData.id)"
                >
                  <svg
                    v-if="isExpanded(orgData.id)"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span class="font-medium">
                    {{ isExpanded(orgData.id) ? 'Masquer' : 'Voir' }} {{ orgData.children.length }} service{{ orgData.children.length > 1 ? 's' : '' }}
                  </span>
                </button>
              </div>

              <!-- Ligne de connexion -->
              <div
                v-if="isExpanded(orgData.id)"
                class="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400"
              />

              <!-- Enfants niveau 1 (Secrétariat + DGAML) -->
              <div
                v-if="isExpanded(orgData.id)"
                class="relative"
              >
                <div
                  v-if="orgData.children.length > 1"
                  class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform -translate-y-4"
                />

                <div class="flex gap-8 flex-wrap justify-center">
                  <div
                    v-for="child in orgData.children"
                    :key="child.id"
                    class="relative"
                  >
                    <!-- Ligne verticale -->
                    <div
                      v-if="orgData.children.length > 1"
                      class="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-300 transform -translate-x-1/2 -translate-y-8"
                    />

                    <div class="flex flex-col items-center">
                      <!-- Carte niveau 1 -->
                      <div :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300', getSize(1).card, 'min-w-[280px] max-w-[320px]']">
                        <div :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(1), 'rounded-t-xl']" />

                        <div class="flex items-start gap-4 mt-2">
                          <div :class="[getSize(1).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100']">
                            <img
                              :src="child.image || 'https://via.placeholder.com/150'"
                              :alt="child.name"
                              class="w-full h-full object-cover"
                            >
                          </div>

                          <div class="flex-1 min-w-0">
                            <h3 :class="['font-bold text-gray-800', getSize(1).text, 'mb-1 line-clamp-2']">
                              {{ child.name }}
                            </h3>
                            <p class="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                              {{ child.title }}
                            </p>
                            <p
                              v-if="child.subtitle"
                              class="text-xs text-gray-500 italic line-clamp-1"
                            >
                              {{ child.subtitle }}
                            </p>
                          </div>
                        </div>

                        <button
                          v-if="child.children && child.children.length > 0"
                          class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-[#0B5433] hover:text-[#5D73AD] transition-colors py-2 border-t border-gray-100"
                          @click="toggleNode(child.id)"
                        >
                          <svg
                            v-if="isExpanded(child.id)"
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          <svg
                            v-else
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span class="font-medium">
                            {{ isExpanded(child.id) ? 'Masquer' : 'Voir' }} {{ child.children.length }} {{ child.children.length > 1 ? 'directions' : 'direction' }}
                          </span>
                        </button>
                      </div>

                      <!-- Note: Pour afficher tous les niveaux, vous devrez créer un composant récursif -->
                      <p
                        v-if="isExpanded(child.id) && child.children && child.children.length > 0"
                        class="text-xs text-gray-500 mt-4 text-center italic"
                      >
                        {{ child.children.length }} direction(s) - Cliquez pour développer dans la vue complète
                      </p>
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
              <span class="text-sm text-gray-600">Direction Adjointe & Cellules</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-3 bg-gradient-to-r from-[#5D73AD] to-[#7B8DC4] rounded" />
              <span class="text-sm text-gray-600">Directions & Services</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded" />
              <span class="text-sm text-gray-600">Divisions</span>
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

.delay-200 { transition-delay: 0.2s; }
.delay-400 { transition-delay: 0.4s; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
</style>
