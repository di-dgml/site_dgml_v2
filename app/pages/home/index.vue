<!-- pages/index.vue -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <UContainer class="py-2">
      <div
        class="relative h-96 flex items-center justify-center rounded-2xl overflow-hidden"
      >
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
        <div
          class="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70 z-10"
        />

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
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 -mt-20 relative z-20"
        >
          <UCard
            v-for="(item, i) in quickAccess"
            :key="i"
            :ui="{
              background: 'bg-white',
              shadow: 'shadow-lg hover:shadow-xl',
              rounded: 'rounded-xl',
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
    </UContainer>

    <!-- Actualités Section -->
    <section
      class="pt-16 m-8 bg-gradient-to-r from-green-900 to-blue-900/70 rounded-3xl"
    >
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">
            Dernières Actualités
          </h2>
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
              shadow: 'shadow-xl',
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
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ news.title }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ news.description }}
            </p>
            <div
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <span class="flex items-center gap-1">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                {{ news.date }}
              </span>
              <UButton
                variant="link"
                size="sm"
                trailing-icon="i-heroicons-arrow-right"
              >
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

    <!-- nouvelle disposition -->
    <div class="grid grid-cols-2 md:grid-cols-2 gap-6">
      <!-- Stats Section -->
      <section class="pt-8">
        <UContainer>
          <UCard
            :ui="{
              background: 'bg-white/95 backdrop-blur-sm',
              rounded: 'rounded-3xl',
              shadow: 'shadow-2xl',
            }"
          >
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

      <!-- Plaintes & Certifications Section -->
      <section class="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <UContainer>
          <div class="mx-auto bg-white rounded-3xl shadow-2xl p-12">
            <!-- Icône Support -->
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div
                  class="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg"
                >
                  <UIcon
                    name="i-heroicons-chat-bubble-left-right"
                    class="w-12 h-12 text-white -rotate-12"
                  />
                </div>
              </div>
            </div>

            <!-- Titre -->
            <h2
              class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4"
            >
              Besoin d'aide ?
            </h2>

            <!-- Sous-titre -->
            <p class="text-lg text-gray-600 text-center mb-10">
              Si vous avez une préoccupation, nous sommes là pour vous écouter
            </p>

            <!-- Boutons d'action -->
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <UButton
                size="xl"
                color="red"
                class="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
                to="/plainte"
              >
                <template #leading>
                  <UIcon
                    name="i-heroicons-exclamation-triangle"
                    class="w-5 h-5"
                  />
                </template>
                Déposer une plainte
              </UButton>

              <UButton
                size="xl"
                color="blue"
                class="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
                to="/suggestion"
              >
                <template #leading>
                  <UIcon name="i-heroicons-light-bulb" class="w-5 h-5" />
                </template>
                Faire une suggestion
              </UButton>
            </div>
          </div>
        </UContainer>
      </section>
    </div>
    <!-- Fin -->
  </div>
</template>

<script setup lang="ts">
const heroImages = ref([
  {
    id: 1,
    url: "https://picsum.photos/1200/400?random=hero1",
    alt: "Bâtiment administratif",
  },
  {
    id: 2,
    url: "https://picsum.photos/1200/400?random=hero2",
    alt: "Parc automobile",
  },
  {
    id: 3,
    url: "https://picsum.photos/1200/400?random=hero3",
    alt: "Personnel en action",
  },
  {
    id: 4,
    url: "https://picsum.photos/1200/400?random=hero4",
    alt: "Infrastructure moderne",
  },
  {
    id: 5,
    url: "https://picsum.photos/1200/400?random=hero5",
    alt: "Service public",
  },
]);

const quickAccess = [
  "Gestion et entretien des biens meubles et bâtiments administratifs",
  "Comptabilité des matières et centralisation des comptes des matières",
  "Gestion du parc automobile et autres équipements motorisés de l'Etat",
];

const actualites = [
  {
    title: "Nouvelle politique de gestion du parc automobile",
    description: "Le ministère annonce de nouvelles mesures pour optimiser la gestion et l'entretien du parc automobile de l'État.",
    date: "15 Déc 2024",
    badge: { text: "Annonce", color: "blue" },
  },
  {
    title: "Rénovation des bâtiments administratifs",
    description:
      "Lancement du programme de rénovation des infrastructures publiques dans 12 régions du pays.",
    date: "12 Déc 2024",
    badge: { text: "Projet", color: "green" },
  },
  {
    title: "Formation du personnel technique",
    description:
      "Session de formation intensive pour le personnel en charge de la maintenance et de la logistique.",
    date: "10 Déc 2024",
    badge: { text: "Formation", color: "orange" },
  },
];

const selectedLanguage = ref("Français");
const languages = ["Français", "English"];

const form = ref({
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  description: "",
  files: [],
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Plainte envoyée:", form.value);
    // Afficher une notification de succès
    const toast = useToast();
    toast.add({
      title: "Plainte envoyée",
      description: "Votre plainte a été envoyée avec succès!",
      color: "green",
    });

    // Reset du formulaire
    form.value = {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      description: "",
      files: [],
    };
  } catch (error) {
    console.error("Erreur:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
