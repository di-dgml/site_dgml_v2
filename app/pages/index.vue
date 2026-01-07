<template>
  <div class="min-h-screen bg-slate-50 dark:bg-gray-950">
    <UContainer class="py-2">
      <div class="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
        <UCarousel
          v-slot="{ item }"
          :items="heroSlides"
          arrows
          :autoplay="5000"
        >
          <div class="relative h-96 flex items-center justify-center">
            <NuxtImg
              :src="item.backgroundUrl"
              :alt="item.alt"
              class="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />

            <div
              class="
                absolute inset-0 z-10
                bg-gradient-to-r from-[#114b3d]/85 via-[#0a3241]/85 to-[#061c4d]/85
              "
            />

            <div class="relative z-20 text-center text-white px-4 w-full">
              <template v-if="item.type === 'main'">
                <h1 class="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                  Direction générale du Matériel et de la Logistique
                </h1>
                <p class="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md italic">
                  Préserver et Entretenir le bien public
                </p>
              </template>

              <template v-else-if="item.type === 'news'">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
                    {{ item.title }}
                  </h2>
                  <NuxtLink 
                    :to="`/blog/${item.slug}`"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/10"
                  >
                    <UIcon name="i-heroicons-document-text" class="w-6 h-6" />
                    <span>Lire l'article</span>
                    <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
                  </NuxtLink>
                </div>
              </template>
            </div>
          </div>
        </UCarousel>
      </div>

      <div class="relative z-20 -mt-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 py-8">
          <UCard
            v-for="(item, i) in quickAccess"
            :key="i"
            class="cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center py-10 px-6 bg-white dark:bg-gray-900 border-none shadow-xl ring-1 ring-black/5"
          >
            <div class="flex justify-center items-center mb-8">
              <div class="bg-gradient-to-br from-[#114b3d] to-[#061c4d] p-6 rounded-2xl shadow-lg group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  class="text-white"
                >
                  <template v-if="i === 2">
                    <rect x="10" y="35" width="80" height="35" fill="currentColor" opacity="0.3"/>
                    <rect x="20" y="25" width="60" height="20" fill="currentColor"/>
                    <circle cx="25" cy="75" r="12" fill="currentColor"/>
                    <circle cx="75" cy="75" r="12" fill="currentColor"/>
                    <circle cx="25" cy="75" r="6" fill="#061c4d"/>
                    <circle cx="75" cy="75" r="6" fill="#061c4d"/>
                  </template>

                  <template v-else-if="i === 1">
                    <rect x="15" y="10" width="70" height="80" rx="8" fill="currentColor" opacity="0.2"/>
                    <rect x="15" y="10" width="70" height="80" rx="8" stroke="currentColor" stroke-width="4" fill="none"/>
                    <rect x="25" y="25" width="50" height="8" fill="currentColor" opacity="0.6"/>
                    <rect x="25" y="45" width="45" height="8" fill="currentColor" opacity="0.6"/>
                    <rect x="25" y="65" width="50" height="8" fill="currentColor" opacity="0.6"/>
                  </template>

                  <template v-else>
                    <rect x="20" y="15" width="60" height="75" rx="4" fill="currentColor" opacity="0.2"/>
                    <rect x="25" y="25" width="20" height="25" fill="currentColor"/>
                    <rect x="55" y="25" width="20" height="25" fill="currentColor"/>
                    <rect x="25" y="60" width="20" height="25" fill="currentColor"/>
                    <rect x="55" y="60" width="20" height="25" fill="currentColor"/>
                    <polygon points="20,15 50,5 80,15" fill="currentColor" opacity="0.4"/>
                  </template>
                </svg>
              </div>
            </div>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-relaxed px-4">
              {{ item }}
            </h3>
          </UCard>
        </div>
      </div>
    </UContainer>

    <section
      class="pt-16 m-8 bg-gradient-to-br from-[#114b3d] via-[#0a3241] to-[#061c4d] rounded-3xl dark:text-white shadow-2xl"
    >
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-white">
            Dernières Actualités
          </h2>
          <p class="max-w-2xl mx-auto text-emerald-100/90">
            Restez informé des dernières nouvelles et événements
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
          <UCard
            v-for="(news, i) in actualites"
            :key="i"
            class="hover:scale-105 transition transform cursor-pointer border-none bg-white/10 backdrop-blur-sm ring-1 ring-white/10"
            :ui="{ body: { padding: 'p-4' } }"
          >
            <NuxtImg
              :src="news.imageUrl"
              :alt="news.title"
              class="w-full h-48 object-cover rounded-xl mb-4"
            />
            <UBadge :color="news.badge.color === 'red' ? 'red' : 'emerald'" variant="solid" class="mb-3">
              {{ news.badge.text }}
            </UBadge>
            <h3 class="text-xl font-bold mb-2 text-white">
              {{ news.title }}
            </h3>
            <p class="mb-4 line-clamp-3 text-gray-300 text-sm">
              {{ news.description }}
            </p>
            <div
              class="flex items-center justify-between text-sm text-emerald-300"
            >
              <span class="flex items-center gap-1">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                {{ news.date }}
              </span>
              <UButton
                class="text-white cursor-pointer hover:text-emerald-300"
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
            to="/blog"
            size="xl"
            color="white"
            variant="solid"
            trailing-icon="i-heroicons-newspaper"
            class="text-[#114b3d] font-bold"
          >
            Voir toutes les actualités
          </UButton>
        </div>
      </UContainer>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-16">

      <section class="py-0 h-full"> <UContainer class="h-full px-0">
           <div class="mx-auto rounded-3xl shadow-xl p-12 h-full flex flex-col justify-center items-center bg-white dark:bg-gray-900 border border-gray-100">
            <h2
              class="text-2xl md:text-3xl font-bold text-[#114b3d] dark:text-white text-center mb-4"
            >
              Certifiée ISO 9001
            </h2>

            <p class="text-sm text-center mb-10 text-gray-600 dark:text-gray-300">
              Une certification qui atteste de notre engagement envers la qualité et l'amélioration continue de nos services.
            </p>
            <div class="flex justify-center">
              <NuxtImg
                  src="/img/logo_certifie.jpg"
                  alt="logo certifié"
                  class="max-w-full max-h-full h-40 object-contain rounded-2xl shadow-lg"
                />
            </div>
          </div>
        </UContainer>
      </section>

      <section class="py-0 h-full">
        <UContainer class="h-full px-0">
           <div class="mx-auto rounded-3xl shadow-xl p-12 h-full bg-white dark:bg-gray-900 border border-gray-100">
            <h2
              class="text-2xl md:text-3xl font-bold text-[#114b3d] dark:text-white text-center mb-4"
            >
              Besoin d'aide ?
            </h2>

            <p class="text-sm text-center mb-10 text-gray-600 dark:text-gray-300">
              Si vous avez une préoccupation, nous sommes là pour vous écouter
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <NuxtLink 
                to="/plainte"
                class="flex flex-col items-center p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-sm"
              >
                <div class="bg-gradient-to-br from-red-500 to-red-700 p-5 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow">
                  <UIcon
                    name="i-heroicons-exclamation-triangle"
                    class="w-10 h-10 text-white"
                  />
                </div>
                <span class="text-lg font-bold text-gray-800 dark:text-white text-center whitespace-nowrap">
                  Déposer une plainte
                </span>
              </NuxtLink>

              <NuxtLink 
                to="/suggestion"
                class="flex flex-col items-center p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300 hover:scale-105 cursor-pointer group shadow-sm"
              >
                <div class="bg-gradient-to-br from-[#114b3d] to-[#061c4d] p-5 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow">
                  <UIcon
                    name="i-heroicons-light-bulb"
                    class="w-10 h-10 text-white"
                  />
                </div>
                <span class="text-lg font-bold text-gray-800 dark:text-white text-center whitespace-nowrap">
                  Faire une suggestion
                </span>
              </NuxtLink>
            </div>
           </div>
        </UContainer>
      </section>
    </div>
    </div>
</template>

<script setup lang="ts">
// (Script identique à votre version originale pour assurer le fonctionnement)
const { data: posts } = await useFetch('https://dgml.bj/wp-json/wp/v2/posts?per_page=3&orderby=date&order=desc&_embed');

const getImageUrl = (post: any) => {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return 'https://picsum.photos/400/250?random=' + post.id;
};

const stripHtml = (html: string): string => {
  if (typeof document !== 'undefined') {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
  return html.replace(/<[^>]*>/g, '')
}

const actualites = computed(() => {
  if (!posts.value) return [];
  return (posts.value as any[]).map((post: any) => ({
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered),
    date: new Date(post.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    imageUrl: getImageUrl(post),
    slug: post.slug,
    badge: {
      text: post.categories && post.categories.includes(3) ? 'Important' : 'Info',
      color: post.categories && post.categories.includes(3) ? 'red' : 'emerald' // Ajusté pour le thème
    }
  }));
});

const heroSlides = computed(() => {
  const slides = [
    {
      type: 'main',
      backgroundUrl: "/img/logo.png",
      alt: 'Direction générale du Matériel et de la Logistique',
    }
  ];

  const latestNews = actualites.value.slice(0, 2);

  latestNews.forEach((news) => {
    slides.push({
      type: "news",
      backgroundUrl: news.imageUrl,
      alt: news.title,
      title: news.title,
      description: news.description,
      date: news.date,
      slug: news.slug,
      badge: news.badge,
    } as any);
  });

  return slides;
});

const quickAccess = [
  "Gestion et entretien des biens meubles et bâtiments administratifs",
  "Comptabilité des matières et centralisation des comptes des matières",
  "Gestion du parc automobile et autres équipements motorisés de l'Etat",
];
</script>