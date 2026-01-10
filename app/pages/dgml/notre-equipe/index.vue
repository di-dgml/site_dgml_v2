<script setup lang="ts">
import { ref, onMounted } from 'vue'

const expandedNodes = ref(new Set(['dgml', 'dgaml']))
const selectedImage = ref<string | null>(null)

const toggleNode = (id: string) => {
    if (expandedNodes.value.has(id)) {
        expandedNodes.value.delete(id)
    } else {
        expandedNodes.value.add(id)
    }
}

const isExpanded = (id: string) => expandedNodes.value.has(id)

const showImage = (imageUrl: string) => {
    selectedImage.value = imageUrl
}

const closeImage = () => {
    selectedImage.value = null
}

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
    image: '/img/DGML2-768x768-jpg.webp',
    children: [
        {
            id: 'secretariat-dgml',
            name: 'À définir',
            title: 'Secrétaire Particulière',
            subtitle: '',
            image: '',
            children: []
        },
        {
            id: 'dgaml',
            name: 'À définir',
            title: 'Directeur Général Adjoint du Matériel et de la Logistique',
            subtitle: 'DGAML',
            image: '',
            children: [
                {
                    id: 'cciq',
                    name: 'À définir',
                    title: 'Chef de la Cellule du Contrôle Interne et de la Qualité',
                    subtitle: 'CCIQ',
                    image: '',
                    children: []
                },
                {
                    id: 'cerc',
                    name: 'À définir',
                    title: 'Chef de la Cellule des Études, des Réformes et du Contentieux',
                    subtitle: 'CERC',
                    image: '',
                    children: []
                },
                {
                    id: 'dmcm',
                    name: 'À définir',
                    title: 'Directeur du Matériel et de la Comptabilité des matières',
                    subtitle: 'DMCM',
                    image: '',
                    children: []
                },
                {
                    id: 'dpib',
                    name: 'À définir',
                    title: 'Directeur du Patrimoine Immobilier Bati',
                    subtitle: 'DPIB',
                    image: '',
                    children: []
                },
                {
                    id: 'dgca',
                    name: 'À définir',
                    title: 'Directeur du Garage Central Administratif',
                    subtitle: 'DGCA',
                    image: '',
                    children: []
                },
                {
                    id: 'dgr',
                    name: 'À définir',
                    title: 'Directeur de la Gestion des Ressources',
                    subtitle: 'DGR',
                    image: '',
                    children: []
                },
                {
                    id: 'di',
                    name: 'À définir',
                    title: 'Directeur de l\'Informatique',
                    subtitle: 'DI',
                    image: '',
                    children: []
                }
            ]
        }
    ]
}

const getBgColor = (level: number, isSecretariat: boolean = false) => {
    if (isSecretariat) return 'from-amber-500 to-amber-600'
    if (level === 0) return 'from-[#0B5433] to-[#3a6470]' // Directeur
    if (level === 1) return 'from-[#3a6470] to-[#5D73AD]' // Directeur Adjoint
    if (level === 2) return 'from-[#5D73AD] to-[#7B8DC4]' // Directeurs Opérationnelles
    return 'from-gray-600 to-gray-700'
}

const getSize = (level: number) => {
    if (level === 0) return { img: 'w-48 h-48', text: 'text-lg', card: 'p-6', height: 'min-h-[180px]' }
    if (level === 1) return { img: 'w-48 h-48', text: 'text-base', card: 'p-5', height: 'min-h-[160px]' }
    if (level === 2) return { img: 'w-32 h-48', text: 'text-sm', card: 'p-4', height: 'min-h-[170px]' }
    return { img: 'w-32 h-32', text: 'text-xs', card: 'p-3', height: 'min-h-[140px]' }
}
</script>

<template>
    <div class="animate-fade-in">
        <div
            class="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-[#0B5433] via-[#3a6470] to-[#5D73AD] p-12 md:p-16 mb-12">
            <!-- Animated background elements -->
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute -top-1/2 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
                <div
                    class="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-delayed">
                </div>
                <div class="absolute top-1/4 right-1/3 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse-slow">
                </div>
            </div>

            <!-- Grid pattern overlay -->
            <div class="absolute inset-0 opacity-10"
                style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;">
            </div>

            <!-- Content -->
            <div class="relative z-10 text-center">
                <!-- Badge -->
                <div
                    class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 animate-slide-down">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <!-- <span class="text-sm font-semibold">Organisation</span> -->
                </div>

                <!-- Main title with staggered animation -->
                <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-4">
                    <span class="inline-block animate-slide-up">Notre </span> <span> </span>
                    <span class="inline-block animate-slide-up" style="animation-delay: 0.1s;"> </span>
                    <span class="inline-block animate-slide-up" style="animation-delay: 0.2s;"> équipe</span>
                </h1>

                <!-- Subtitle -->
                <p class="text-white/90 text-xl md:text-2xl font-light max-w-3xl mx-auto mb-6 animate-fade-in-delayed">
                    Direction Générale du Matériel et de la Logistique
                </p>

                <!-- Decorative line -->
                <div class="flex items-center justify-center gap-3 animate-fade-in-delayed-more">
                    <div class="h-px w-16 bg-gradient-to-r from-transparent to-white/50"></div>
                    <div class="w-2 h-2 rounded-full bg-white/70"></div>
                    <div class="h-px w-16 bg-gradient-to-l from-transparent to-white/50"></div>
                </div>

                <!-- Stats or info cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fade-in-up"
                        style="animation-delay: 0.3s;">
                        <div class="text-3xl font-bold text-white mb-1">1</div>
                        <div class="text-white/80 text-sm">Directeur Générale</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fade-in-up"
                        style="animation-delay: 0.4s;">
                        <div class="text-3xl font-bold text-white mb-1">5</div>
                        <div class="text-white/80 text-sm">Directions Opérationnelles</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fade-in-up"
                        style="animation-delay: 0.5s;">
                        <div class="text-3xl font-bold text-white mb-1">2</div>
                        <div class="text-white/80 text-sm">Cellules Spécialisées</div>
                    </div>
                </div>
            </div>

            <!-- Decorative corner elements -->
            <div class="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/20 rounded-tl-3xl"></div>
            <div class="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/20 rounded-br-3xl"></div>
        </div>
        <UPageSection class="animate-slide-in-up -mt-10 md:-mt-25">
            <div class="max-w-7xl mx-auto px-4">

                <!-- Notre équipe -->
                <div class="pb-8 mt-10 md:mt-0">
                    <div class="w-full">
                        <!-- Niveau 0: DGML -->
                        <div class="flex flex-col items-center mb-8">
                            <!-- DGML -->
                            <div
                                :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group', getSize(0).card, 'w-full max-w-[340px]', getSize(0).height]">
                                <div
                                    :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(0), 'rounded-t-xl']" />

                                <!-- Photo en haut -->
                                <div class="flex flex-col items-center gap-3">
                                    <div
                                        :class="[getSize(0).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100 relative group-hover:ring-[#0B5433] transition-all duration-300']">
                                        <img :src="orgData.image" :alt="orgData.name"
                                            class="w-full h-full object-cover">
                                        <!-- Overlay avec icône au hover -->
                                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                            @click="showImage(orgData.image)">
                                            <div class="text-white text-center">
                                                <svg class="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                                <span class="text-xs font-medium">Voir la photo</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <h3 :class="['text-xl font-bold text-gray-800', getSize(0).text, 'mb-1']">
                                            {{ orgData.name }}
                                        </h3>
                                        <p class="text-lg text-gray-600 font-medium mb-1">
                                            {{ orgData.title }}
                                        </p>
                                        <p v-if="orgData.subtitle" class="text-sm text-gray-500 italic">
                                            {{ orgData.subtitle }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Ligne verticale vers le niveau 1 -->
                            <div v-if="isExpanded(orgData.id)"
                                class="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-400" />
                        </div>

                        <!-- Niveau 1: Secrétariat et DGAML -->
                        <div v-if="isExpanded(orgData.id)" class="relative">
                            <!-- Ligne horizontale entre Secrétariat et DGAML -->
                            <div v-if="orgData.children.length > 1"
                                class="h-0.5 bg-linear-to-r from-transparent via-gray-300 to-transparent transform -translate-y-4">
                            </div>

                            <div class="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-12">
                                <!-- Secrétariat (à gauche) -->
                                <div class="md:w-1/3 flex justify-end">
                                    <div class="relative">
                                        <!-- Carte Secrétariat -->
                                        <div
                                            :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group', getSize(1).card, 'w-full max-w-[340px]', 'min-h-[140px]']">
                                            <div
                                                :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(1, true), 'rounded-t-xl']" />

                                            <!-- Photo en haut -->
                                            <div class="flex flex-col items-center gap-2">
                                                <div
                                                    :class="['w-48 h-48', 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100 relative group-hover:ring-amber-500 transition-all duration-300']">
                                                    <img :src="orgData.children[0]?.image || 'https://via.placeholder.com/150'"
                                                        :alt="orgData.children[0]?.name"
                                                        class="w-full h-full object-cover">
                                                    <!-- Overlay avec icône au hover -->
                                                    <div v-if="orgData.children[0]?.image"
                                                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                                        @click="showImage(orgData.children[0]?.image)">
                                                        <div class="text-white text-center">
                                                            <svg class="w-5 h-5 mx-auto mb-1" fill="none"
                                                                stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                            <span class="text-xs font-medium">Voir photo</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="text-center">
                                                    <h3 class="text-xl font-bold text-gray-800 text-sm mb-1">
                                                        {{ orgData.children[0]?.name }}
                                                    </h3>
                                                    <p class="text-lg text-gray-600 font-medium mb-1">
                                                        {{ orgData.children[0]?.title }}
                                                    </p>
                                                    <p v-if="orgData.children[0]?.subtitle"
                                                        class="text-sm text-gray-500 italic">
                                                        {{ orgData.children[0]?.subtitle }}
                                                    </p>

                                                    <!-- Badge "Rattaché au DGML" -->
                                                    <div
                                                        class="mt-1 inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-sm font-medium px-2 py-1 rounded-full">
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span>SP du DGML</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Ligne verticale vers Secrétariat -->
                                        <div
                                            class="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-300 transform -translate-x-1/2 -translate-y-4" />
                                    </div>
                                </div>

                                <!-- DGAML (à droite) -->
                                <div class="md:w-2/3 flex justify-start">
                                    <div class="relative">
                                        <!-- Carte DGAML -->
                                        <div
                                            :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group mb-4', getSize(1).card, 'w-full max-w-[340px]', getSize(1).height]">
                                            <div
                                                :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(1), 'rounded-t-xl']" />

                                            <!-- Photo en haut -->
                                            <div class="flex flex-col items-center gap-3">
                                                <div
                                                    :class="[getSize(1).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100 relative group-hover:ring-[#3a6470] transition-all duration-300']">
                                                    <img :src="orgData.children[1]?.image || 'https://via.placeholder.com/150'"
                                                        :alt="orgData.children[1]?.name"
                                                        class="w-full h-full object-cover">
                                                    <!-- Overlay avec icône au hover -->
                                                    <div v-if="orgData.children[1]?.image"
                                                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                                        @click="showImage(orgData.children[1]?.image)">
                                                        <div class="text-white text-center">
                                                            <svg class="w-6 h-6 mx-auto mb-1" fill="none"
                                                                stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                            <span class="text-xs font-medium">Voir photo</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="text-center">
                                                    <h3
                                                        :class="[' text-xl font-bold text-gray-800', getSize(1).text, 'mb-1']">
                                                        {{ orgData.children[1]?.name }}
                                                    </h3>
                                                    <p class="text-lg text-gray-600 font-medium mb-1">
                                                        {{ orgData.children[1]?.title }}
                                                    </p>
                                                    <p v-if="orgData.children[1]?.subtitle"
                                                        class="text-sm text-gray-500 italic">
                                                        {{ orgData.children[1]?.subtitle }}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                v-if="orgData.children[1]?.children && orgData.children[1]?.children.length > 0"
                                                class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-[#0B5433] hover:text-[#5D73AD] transition-colors py-2 border-t border-gray-100"
                                                >
                                                <!-- @click="toggleNode(orgData.children[1]?.id)" -->
                                                 <!-- v-if="isExpanded(orgData.children[1]?.id)"  -->
                                                <svg class="w-4 h-4"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                                <!-- <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg> -->
                                                <span class="font-medium">
                                                    <!-- {{ isExpanded(orgData.children[1]?.id) ? 'Masquer' : 'Voir' }} {{ -->
                                                    {{ orgData.children[1]?.children.length }} éléments
                                                </span>
                                            </button>
                                        </div>

                                        <!-- Ligne verticale vers DGAML -->
                                        <!-- <div class="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-300 transform -translate-x-1/2 -translate-y-4" /> -->
                                    </div>
                                </div>
                            </div>


                            <div class="flex flex-col items-center">
                                <!-- Ligne verticale vers les directions -->
                                <div v-if="isExpanded(orgData.children[1]!.id)"
                                    class="w-0.5 h-8 bg-linear-to-b from-gray-300 to-gray-400"></div>
                            </div>

                        </div>

                        <!-- Niveau 2: Les 7 directions sous DGAML -->
                        <div v-if="isExpanded(orgData.children[1]!.id) && orgData.children[1]?.children && orgData.children[1]?.children.length > 0"
                            class="mt-8 scroll-reveal delay-200">
                            <!-- Ligne horizontale avec points de connexion -->
                            <div class="relative w-full mb-12">
                                <div class="absolute top-0 left-0 right-0 h-0.5 bg-gray-300" />

                                <!-- Points de connexion alignés avec les cartes -->
                                <div class="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2 px-2 md:px-0 relative">
                                    <div v-for="(direction, index) in orgData.children[1]?.children" :key="direction.id"
                                        :class="[
                                            'relative flex flex-col items-center',
                                            // Pour centrer sur mobile
                                            index < 3 ? 'md:col-span-1' :
                                                index === 3 ? 'md:col-span-1 md:col-start-4' :
                                                    'md:col-span-1'
                                        ]">
                                        <!-- Point de connexion centré avec la carte -->
                                        <div
                                            class="absolute top-0 left-1/2 w-2 h-2 bg-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

                                        <!-- Ligne verticale vers la direction -->
                                        <div
                                            class="absolute top-[2px] left-1/2 w-0.5 h-4 bg-gray-300 transform -translate-x-1/2" />
                                    </div>
                                </div>
                            </div>

                            <!-- Grille des 7 directions (cartes) avec hauteur fixe -->
                            <div class="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2 px-2 md:px-0">
                                <div v-for="(direction, index) in orgData.children[1]?.children" :key="direction.id"
                                    :class="[
                                        'relative flex flex-col items-center',
                                        // Pour centrer sur mobile
                                        index < 3 ? 'md:col-span-1' :
                                            index === 3 ? 'md:col-span-1 md:col-start-4' :
                                                'md:col-span-1'
                                    ]">
                                    <!-- Carte Direction avec hauteur fixe -->
                                    <div
                                        :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full group', getSize(2).card, 'h-[340px] overflow-hidden']">
                                        <div
                                            :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(2), 'rounded-t-xl']" />

                                        <!-- Photo en haut -->
                                        <div class="flex flex-col items-center gap-3">
                                            <div
                                                :class="[getSize(2).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100 relative group-hover:ring-[#5D73AD] transition-all duration-300']">
                                                <img :src="direction.image || 'https://via.placeholder.com/150'"
                                                    :alt="direction.name" class="w-full h-full object-cover">
                                                <!-- Overlay avec icône au hover -->
                                                <div v-if="direction.image"
                                                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                                    @click="showImage(direction.image)">
                                                    <div class="text-white text-center">
                                                        <svg class="w-6 h-6 mx-auto mb-1" fill="none"
                                                            stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                        </svg>
                                                        <span class="text-xs font-medium">Voir photo</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="text-center px-1">
                                                <h3 :class="['font-bold text-gray-800', getSize(2).text, 'mb-1']">
                                                    {{ direction.name }}
                                                </h3>
                                                <p
                                                    class="text-xs text-gray-600 font-medium mb-1 leading-tight line-clamp-3">
                                                    {{ direction.title }}
                                                </p>
                                                <p v-if="direction.subtitle" class="text-xs text-gray-500 italic">
                                                    {{ direction.subtitle }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Version mobile avec disposition verticale simple -->
                            <div class="md:hidden mt-8">
                                <div class="space-y-4">
                                    <div v-for="(direction, index) in orgData.children[1]?.children" :key="direction.id"
                                        class="relative group">
                                        <!-- Carte Direction -->
                                        <div
                                            :class="['relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300', getSize(2).card, 'max-w-[320px] mx-auto']">
                                            <div
                                                :class="['absolute inset-x-0 top-0 h-2 bg-gradient-to-r', getBgColor(2), 'rounded-t-xl']" />

                                            <!-- Photo à gauche sur mobile -->
                                            <div class="flex items-start gap-3">
                                                <div
                                                    :class="[getSize(2).img, 'rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-100 relative group-hover:ring-[#5D73AD] transition-all duration-300']">
                                                    <img :src="direction.image || 'https://via.placeholder.com/150'"
                                                        :alt="direction.name" class="w-full h-full object-cover">
                                                    <!-- Overlay avec icône au hover -->
                                                    <div v-if="direction.image"
                                                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                                        @click="showImage(direction.image)">
                                                        <div class="text-white text-center">
                                                            <svg class="w-6 h-6 mx-auto mb-1" fill="none"
                                                                stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                            <span class="text-xs font-medium">Voir photo</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="flex-1 min-w-0">
                                                    <h3 :class="['font-bold text-gray-800', getSize(2).text, 'mb-1']">
                                                        {{ direction.name }}
                                                    </h3>
                                                    <p class="text-xs text-gray-600 font-medium mb-1">
                                                        {{ direction.title }}
                                                    </p>
                                                    <p v-if="direction.subtitle" class="text-xs text-gray-500 italic">
                                                        {{ direction.subtitle }}
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

                <!-- Légende -->
                <div class="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-6 scroll-reveal delay-400">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">
                        Légende
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-3 bg-gradient-to-r from-[#0B5433] to-[#3a6470] rounded" />
                            <span class="text-sm text-gray-600">Directeur général</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-3 bg-gradient-to-r from-[#3a6470] to-[#5D73AD] rounded" />
                            <span class="text-sm text-gray-600">Directeur adjoint</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-3 bg-gradient-to-r from-[#5D73AD] to-[#7B8DC4] rounded" />
                            <span class="text-sm text-gray-600">Directeurs opérationnelles</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded" />
                            <span class="text-sm text-gray-600">Secrétaire particulière</span>
                        </div>
                    </div>
                </div>
            </div>
        </UPageSection>

        <!-- Modal pour afficher l'image en grand -->
        <div v-if="selectedImage" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            @click="closeImage">
            <div class="relative max-w-3xl max-h-[90vh]" @click.stop>
                <button class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                    @click="closeImage">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <img :src="selectedImage" alt="Photo agrandie"
                    class="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl" />
            </div>
        </div>
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

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Agrandissement des images */
.w-18 {
    width: 4.5rem;
}

.h-18 {
    height: 4.5rem;
}

/* Effet de hover sur les images */
.group:hover .group-hover\:ring-\[\#0B5433\] {
    ring-color: #0B5433;
}

.group:hover .group-hover\:ring-\[\#3a6470\] {
    ring-color: #3a6470;
}

.group:hover .group-hover\:ring-\[\#5D73AD\] {
    ring-color: #5D73AD;
}

.group:hover .group-hover\:ring-amber-500 {
    ring-color: #f59e0b;
}

/* Hauteur fixe pour les cartes des directions */
.h-\[200px\] {
    height: 200px;
}

/* Responsive */
@media (max-width: 768px) {
    .grid-cols-1.md\:grid-cols-7 {
        grid-template-columns: 1fr;
    }

    .md\:col-span-1 {
        grid-column: span 1;
    }

    .md\:col-start-4 {
        grid-column-start: 1;
    }

    .h-\[200px\] {
        height: auto;
        min-height: 160px;
    }

    /* Masquer la grille des points sur mobile */
    .mb-12 {
        margin-bottom: 0;
    }

    /* Ajustement position Secrétariat sur mobile */
    .absolute.top-\[-30px\].left-1\/4 {
        position: relative;
        top: 0;
        left: 0;
        transform: none;
        margin: 0 auto 2rem auto;
    }

    .absolute.top-\[-20px\].left-\[-120px\] {
        display: none;
    }
}
</style>