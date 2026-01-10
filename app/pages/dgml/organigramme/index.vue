<script setup lang="ts">
import { ref, onMounted } from 'vue';

const expandedDirections = ref<Set<string>>(new Set());

// Par défaut, toutes les directions sont ouvertes
onMounted(() => {
  const allIds = ['cciq', 'cerc', 'dmcm', 'dpib', 'dgca', 'dgr', 'di', 'delegations'];
  allIds.forEach(id => expandedDirections.value.add(id));

  // Animations au scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  const elements = document.querySelectorAll('.scroll-reveal');
  elements.forEach((el) => observer.observe(el));
});

const toggleDirection = (id: string) => {
  if (expandedDirections.value.has(id)) {
    expandedDirections.value.delete(id);
  } else {
    expandedDirections.value.add(id);
  }
};

const isDirectionExpanded = (id: string) => expandedDirections.value.has(id);

const directions = [
  {
    id: 'cciq',
    name: 'À définir',
    title: 'Chef de la Cellule Contrôle Interne de la Qualité',
    code: 'CCIQ',
    color: 'purple',
    type: 'Cellule',
    image: '',
    services: [
      {
        name: 'SMR - Service Maîtrise des Risques',
        divisions: ['DMCR - Div. Cartographie Risques', 'DSR - Div. Surveillance et Revue']
      },
      {
        name: 'SSRC - Service Suivi Normes Qualité',
        divisions: ['DSN - Div. Suivi des Normes', 'DQ - Div. de la Qualité']
      }
    ]
  },
  {
    id: 'cerc',
    name: 'À définir',
    title: 'Chef de la Cellule Études, Réformes et Contentieux',
    code: 'CERC',
    color: 'purple',
    type: 'Cellule',
    image: '',
    services: [
      {
        name: 'SER - Service Études et Réformes',
        divisions: ['DRGBA - Div. Réformes Bâtiments', 'DRCM - Div. Réformes Comptabilité', 'DRGEM - Div. Réformes Équipements']
      },
      {
        name: 'SPC - Service Plaintes Contentieux',
        divisions: []
      }
    ]
  },
  {
    id: 'dmcm',
    name: 'À définir',
    title: 'Directeur du Matériel et de la Comptabilité des Matières',
    code: 'DMCM',
    color: 'green',
    type: 'Direction',
    image: '',
    services: [
      {
        name: 'SGMM - Service Gestion Matériels et Mobiliers',
        divisions: ['DAMM - Div. Acquisitions', 'DRMM - Div. Réforme']
      },
      {
        name: 'SCM - Service Comptabilité Matières',
        divisions: ['DSTCM - Div. Suivi Tenue Comptabilité', 'DInv - Div. des Inventaires', 'DFAT - Div. Formations Appui Technique']
      },
      {
        name: 'SCCOCM - Service Contrôle Centralisation Opérations Comptables',
        divisions: ['DCOCM - Div. Centralisation Opérations Comptables', 'DCCMCL - Div. Centralisation Comptes Matières Collectivités Locales', 'DCVGM - Div. Contrôle Vérification Gestion Matières']
      }
    ]
  },
  {
    id: 'dpib',
    name: 'À définir',
    title: 'Directeur du Patrimoine Immobilier Bâti',
    code: 'DPIB',
    color: 'green',
    type: 'Direction',
    image: '',
    services: [
      {
        name: 'STr - Service des Travaux',
        divisions: ['DRBA - Div. Réfections Bâtiments Administratifs', 'DRL - Div. Réparations Locatives', 'DEAT - Div. Études et Appui Technique']
      },
      {
        name: 'SBE - Service des Bâtiments de l\'État',
        divisions: ['DGBE - Div. Gestion Bâtiments État', 'DPSE - Div. Prospection Sites État']
      },
      {
        name: 'SBAL - Service des Baux Administratifs et Location',
        divisions: ['DPBB - Div. Prise en Bail Bâtiments', 'DMBBE - Div. Mise en Bail Bâtiments État', 'DCBA - Div. Centralisation Baux Administratifs']
      }
    ]
  },
  {
    id: 'dgca',
    name: 'À définir',
    title: 'Directeur du Garage Central Administratif',
    code: 'DGCA',
    color: 'green',
    type: 'Direction',
    image: '',
    services: [
      {
        name: 'SET - Service des Études Techniques',
        divisions: ['DES - Div. Études et Statistiques', 'DAL - Div. Acquisitions et Locations']
      },
      {
        name: 'SPCA - Service du Parc Central Administratif',
        divisions: ['DVPC - Div. Véhicules Parc Central', 'DSPSR - Div. Suivi Parcs Sectoriels et Réquisitions', 'DAEME - Div. Autres Équipements Motorisés État']
      },
      {
        name: 'SM - Service de la Maintenance',
        divisions: ['DMV DGML - Div. Maintenance Véhicules DGML', 'DMVS - Div. Maintenance Véhicules Sectoriels', 'DGAM - Div. Gestion Ateliers Maintenance']
      },
      {
        name: 'SREM - Service des Réformes des Équipements Motorisés',
        divisions: ['DEDR - Div. Étude Demandes Réforme', 'DA CNRVA - Div. Appui CNRVA']
      },
      {
        name: 'SVTVA - Service des Visites Techniques des Véhicules Administratifs',
        divisions: ['DCT - Div. Contrôles Techniques', 'DDDVT - Div. Délivrance Documents Visite Technique']
      }
    ]
  },
  {
    id: 'dgr',
    name: 'À définir',
    title: 'Directeur de la Gestion des Ressources',
    code: 'DGR',
    color: 'green',
    type: 'Direction',
    image: '',
    services: [
      {
        name: 'SAP - Service Administratif et du Personnel',
        divisions: ['DSA - Div. Secrétariat Administratif', 'DRU/C - Div. Relations avec Usagers/Clients', 'DGP - Div. Gestion du Personnel']
      },
      {
        name: 'SBC - Service du Budget et de la Comptabilité',
        divisions: ['DPSEB - Div. Préparation et Suivi Exécution Budget', 'DDB - Div. Dépenses de Bâtiments', 'DDEM - Div. Dépenses Équipements Motorisés', 'DCPR - Div. Commandes Publiques et Recouvrement']
      },
      {
        name: 'SGM - Service de la Gestion des Matières',
        divisions: ['DM - Div. du Matériel', 'DSG - Div. Services Généraux']
      },
      {
        name: 'RSA - Régie Spéciale d\'Avances',
        divisions: ['Assistant', 'Billeteur']
      }
    ]
  },
  {
    id: 'di',
    name: 'À définir',
    title: 'Directeur de l\'Informatique',
    code: 'DI',
    color: 'green',
    type: 'Direction',
    image: '',
    services: [
      {
        name: 'SGLABD - Service du Génie Logiciel et Administration Bases de Données',
        divisions: ['DED - Div. Études et Documentation', 'DD - Div. Développement']
      },
      {
        name: 'SEON - Service de l\'Exploitation, Organisation et du Numérique',
        divisions: ['DEF - Div. Études et Formations', 'DDS - Div. Déploiement et Support', 'DNI - Div. Numérique et Imprimerie']
      },
      {
        name: 'SRSM - Service Réseau, Système et Maintenance',
        divisions: ['DRM - Div. Réseau et Maintenance', 'DSST - Div. Système et Support Technique']
      }
    ]
  },
  {
    id: 'delegations',
    name: 'Délégations Départementales',
    title: 'Délégations Départementales',
    code: 'DD',
    color: 'orange',
    type: 'Délégations',
    image: '',
    services: [
      {
        name: 'Assistant 1',
        divisions: ['Rang de Chef de Service']
      },
      {
        name: 'Assistant 2',
        divisions: ['Rang de Chef de Service']
      }
    ]
  }
];
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-green-50">
    <!-- En-tête en pleine largeur -->
    <div class="relative overflow-hidden rounded-b-3xl scroll-reveal">
      <!-- Background animé -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B5433] via-[#3a6470] to-[#5D73AD] opacity-90"></div>
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <!-- Cercles décoratifs animés -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s;"></div>

      <!-- Contenu -->
      <div class="relative z-10 py-16 px-8 text-center text-white">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6 shadow-xl animate-fade-in-down">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 3v4M3 5h4M16 3v4m-2-2h4M7 13v4m-2-2h4m10-6v4m-2-2h4M7 21v-4m-2 2h4m10 0h-4m4 0v-4m0 4v4m0-4h-4" />
          </svg>
        </div>

        <!-- Titre principal -->
        <h1 class="text-xl md:text-6xl font-extrabold mb-4 tracking-tight animate-slide-in-up">
          Organigramme
        </h1>
        <div class="w-32 h-2 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6 rounded-full">
        </div>
        <p class="text-xl md:text-2xl font-light mb-2 opacity-95">
          Direction Générale du Matériel et de la Logistique
        </p>
        <p class="text-sm md:text-base opacity-80 max-w-2xl mx-auto">
          La structure organisationnelle complète de la DGML, incluant les directions,
          services et divisions clés qui assurent notre mission.
        </p>
      </div>
    </div>
    <UContainer class="pb-10 pt-10">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Niveau DGML → SP + DGAML (même niveau) -->
        <div class="flex flex-col items-center mb-12 scroll-reveal">
          <!-- DGML en haut -->
          <div
            class="relative bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-2xl w-full mb-6 transform hover:scale-105 transition-transform duration-300 mx-auto">
            <div class="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0B5433] to-[#3a6470] rounded-t-2xl"></div>
            <div class="flex items-center gap-3 md:gap-4 mt-2">
              <div
                class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#0B5433]/20 shadow-xl">
                <img src="/img/DGML2-768x768-jpg.webp" alt="DGML" class="w-full h-full object-cover" />
              </div>
              <div>
                <h2 class="text-lg md:text-2xl font-bold text-gray-800">Raoufou MAMAM</h2>
                <p class="text-xs md:text-sm text-gray-600 font-medium">Directeur Général du Matériel et de la
                  Logistique</p>
                <p class="text-xs text-[#0B5433] font-bold mt-1">DGML</p>
              </div>
            </div>
          </div>

          <!-- Connecteurs pour Desktop uniquement -->
          <div class="hidden md:block relative w-full max-w-2xl h-16 mb-6">
            <!-- Ligne verticale centrale vers bas -->
            <div
              class="absolute left-1/2 top-0 w-1 h-6 bg-gradient-to-b from-[#0B5433] to-[#5D73AD] rounded-full transform -translate-x-1/2">
            </div>
            <!-- Ligne horizontale vers la gauche uniquement -->
            <div class="absolute left-0 top-6 w-1/2 h-1 bg-gradient-to-r from-gray-400 to-[#5D73AD] rounded-full"></div>
            <!-- Ligne verticale gauche vers SP -->
            <div class="absolute left-18 top-6 w-1 h-10 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
            <!-- Ligne verticale centrale continue vers directions -->
            <div
              class="absolute left-1/2 top-6 w-1 h-60 bg-gradient-to-b from-[#5D73AD] to-[#3a6470] rounded-full transform -translate-x-1/2">
            </div>
          </div>

          <!-- Connecteur mobile simple -->
          <div class="md:hidden w-1 h-6 bg-gradient-to-b from-[#0B5433] to-[#5D73AD] rounded-full mb-4"></div>

          <!-- Layout différent pour mobile et desktop -->
          <div class="w-full max-w-2xl">
            <!-- Desktop: SP à gauche, DGAML centré -->
            <div class="hidden md:grid grid-cols-4 gap-6 relative">
              <!-- SP - 1 colonne à gauche -->
              <div
                class="col-span-1 relative bg-white rounded-xl shadow-xl p-3 border-2 border-gray-200 transform hover:scale-105 transition-transform duration-300">
                <div class="flex flex-col items-center text-center gap-2">
                  <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                    📋
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-gray-800">Secrétariat Particulier</h3>
                    <p class="text-xs text-gray-600 mt-1">du DGML</p>
                    <p class="text-xs text-gray-500 font-semibold mt-1">SP DGML</p>
                    <!-- <p class="text-xs text-gray-400 italic mt-1">Chef de Service</p> -->
                  </div>
                </div>
              </div>

              <!-- Espace vide -->
              <div class="col-span-3"></div>

              <!-- DGAML centré sur les 4 colonnes -->
              <div class="col-span-4 flex justify-center mt-4">
                <div
                  class="relative bg-white rounded-xl shadow-xl p-5 transform hover:scale-105 transition-transform duration-300 w-full max-w-xl">
                  <div class="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-[#3a6470] to-[#5D73AD] rounded-t-xl">
                  </div>
                  <div class="flex items-center gap-4 mt-2">
                    <div
                      class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#0B5433]/20 shadow-xl">
                      <img src="" alt="DGAML" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-xl text-gray-800">À définir</h3>
                      <p class="text-sm text-gray-600 mt-1">Directeur Général Adjoint du Matériel et de la Logistique
                      </p>
                      <p class="text-xs text-[#5D73AD] font-bold mt-2">DGAML</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile: Stack vertical -->
            <div class="md:hidden flex flex-col gap-4">
              <!-- SP mobile -->
              <div class="relative bg-white rounded-xl shadow-xl p-4 border-2 border-gray-200 mx-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                    📋
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-gray-800">Secrétariat Particulier</h3>
                    <p class="text-xs text-gray-600">du DGML</p>
                    <p class="text-xs text-gray-500 font-semibold mt-1">SP DGML</p>
                  </div>
                </div>
              </div>

              <!-- Connecteur mobile -->
              <div class="w-1 h-6 bg-gradient-to-b from-gray-400 to-[#5D73AD] rounded-full mx-auto"></div>

              <!-- DGAML mobile -->
              <div class="relative bg-white rounded-xl shadow-xl p-4 mx-4">
                <div class="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#3a6470] to-[#5D73AD] rounded-t-xl">
                </div>
                <div class="flex items-center gap-3 mt-2">
                  <div
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#0B5433]/20 shadow-xl">
                    <img src="" alt="DGAML" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-base text-gray-800">À définir</h3>
                    <p class="text-xs text-gray-600 mt-1">Directeur Général Adjoint</p>
                    <p class="text-xs text-[#5D73AD] font-bold mt-1">DGAML</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ligne verticale vers directions (desktop seulement) -->
          <div class="hidden md:block w-1 h-8 bg-gradient-to-b from-[#3a6470] to-[#5D73AD] rounded-full mt-6"></div>

          <!-- Ligne mobile vers directions -->
          <div class="md:hidden w-1 h-6 bg-gradient-to-b from-[#5D73AD] to-[#3a6470] rounded-full mt-4"></div>
        </div>

        <!-- Directions, Cellules et Délégations -->
        <div class="space-y-6">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="direction in directions" :key="direction.id"
              class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col">
              <!-- En-tête Direction -->
              <div :class="[
                'p-5 cursor-pointer relative overflow-hidden',
                direction.color === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-800' :
                  direction.color === 'orange' ? 'bg-gradient-to-br from-orange-600 to-orange-800' :
                    'bg-gradient-to-br from-green-600 to-green-800'
              ]" @click="toggleDirection(direction.id)">
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                <div class="relative flex items-start gap-3 text-white">
                  <!-- Avatar / Icône -->
                  <div class="shrink-0">
                    <!-- Image : Direction & Cellules -->
                    <div
                      v-if="direction.color !== 'orange'"
                      class="w-14 h-14 rounded-full overflow-hidden ring-4 ring-[#0B5433]/20 shadow-xl"
                    >
                      <img
                        :src="direction.image"
                        :alt="direction.name"
                        class="w-full h-full object-cover"
                      />
                    </div>

                    <!-- Icône : Délégations -->
                    <div
                      v-else
                      class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                      aria-hidden="true"
                    >
                      <span class="text-2xl">🏛️</span>
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-semibold opacity-90 mb-1">{{ direction.type }}</div>
                    <h4 class="font-bold text-sm mb-1">{{ direction.name }}</h4>
                    <p class="text-xs opacity-90 line-clamp-2 mb-2">{{ direction.title }}</p>
                    <p class="text-xs font-black tracking-wide">{{ direction.code }}</p>
                  </div>
                  <svg
                    :class="['w-6 h-6 transition-transform duration-300', isDirectionExpanded(direction.id) ? 'rotate-180' : '']"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Services et Divisions -->
              <div v-if="isDirectionExpanded(direction.id)"
                class="p-5 space-y-3 bg-gradient-to-br from-gray-50 to-white">
                <div class="text-center text-xs font-bold text-gray-500 bg-gray-100 py-2 rounded-lg">SECRÉTARIAT</div>

                <div v-for="(service, idx) in direction.services" :key="idx"
                  class="bg-white rounded-lg border-l-4 p-3 shadow-sm hover:shadow-md transition-shadow" :class="direction.color === 'purple' ? 'border-purple-500' :
                    direction.color === 'orange' ? 'border-orange-500' :
                      'border-green-500'">
                  <div class="font-bold text-xs mb-2" :class="direction.color === 'purple' ? 'text-purple-700' :
                    direction.color === 'orange' ? 'text-orange-700' :
                      'text-green-700'">
                    {{ service.name }}
                  </div>
                  <div v-if="service.divisions.length > 0" class="space-y-1.5">
                    <div v-for="(division, divIdx) in service.divisions" :key="divIdx"
                      class="text-xs bg-gray-50 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-100 transition-colors">
                      {{ division }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer aligné en bas -->
              <div
                class="px-4 py-3 text-center text-xs font-bold cursor-pointer hover:bg-gray-50 transition-colors border-t-2 mt-auto"
                @click="toggleDirection(direction.id)" :class="direction.color === 'purple' ? 'text-purple-600 border-purple-200' :
                  direction.color === 'orange' ? 'text-orange-600 border-orange-200' :
                    'text-green-600 border-green-200'">
                {{ isDirectionExpanded(direction.id) ? '▲ Masquer les détails' : `▼ ${direction.services.length}
                service${direction.services.length > 1 ? 's' : ''}` }}
              </div>
            </div>
          </div>
        </div>

        <!-- Légende améliorée -->
        <div class="max-w-5xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-8 scroll-reveal delay-400">
          <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-[#0B5433]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Légende des couleurs
          </h3>


          <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div
              class="justify-center align-middle flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B5433] to-[#3a6470] shadow-lg"></div>
              <span class="text-xs font-bold text-gray-700 text-center">Directeur Générale</span>
            </div>
            <div
              class=" justify-center align-middle flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#3a6470] to-[#5D73AD] shadow-lg"></div>
              <span class="text-xs font-bold text-gray-700 text-center">Directeur Générale Adjointe</span>
            </div>
            <div class="col-span-full lg:col-span-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
              <p class="text-center text-[11px] sm:text-xs font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                Rang de Direction opérationnelle
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300/50">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg"></div>
                  <span class="text-[11px] sm:text-xs font-bold text-gray-700 text-center">Cellules</span>
                </div>
                <div
                  class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300/50">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-800 shadow-lg"></div>
                  <span class="text-xs font-bold text-gray-700 text-center">Directions</span>
                </div>
                <div
                  class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300/50">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg"></div>
                  <span class="text-xs font-bold text-gray-700 text-center">Délégations</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

.animate-slide-in-up {
  animation: slideInUp 1.2s ease-out;
}

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

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
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

.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>