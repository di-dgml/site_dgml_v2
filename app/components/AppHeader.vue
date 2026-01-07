<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    label: 'Accueil',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'DGML',
    active: route.path.startsWith('/dgml'),
    children: [
      {
        label: 'Mot du Directeur',
        to: '/dgml/mot-du-directeur'
      },
      {
        label: 'Notre Equipe',
        to: '/dgml/notre_equipe'
      },
      {
        label: 'Organigramme',
        to: '/dgml/organigramme/'
      }
    ]
  },
  {
    label: 'Actualités',
    to: '/blog',
    active: route.path.startsWith('/blog')
  },
  {
    label: 'Documenthèque',
    // to: '/documentheque',
    active: route.path.startsWith('/documentheque'),
    children: [
      {
        label: 'Arrêtés',
        to: '/documentheque/arretes'
      },
      {
        label: 'Décrets',
        to: '/documentheque/decrets'
      }
    ]
  },
  {
    label: 'Directions',
    active: route.path.startsWith('/directions'),
    children: [
      {
        label: 'DPIB',
        to: '#'
      },
      {
        label: 'DMCM',
        to: '#'
      },
      {
        label: 'DGCA',
        to: '#'
      },
      {
        label: 'CERC',
        to: '#'
      },
      {
        label: 'CCIQ',
        to: '#'
      },
      {
        label: 'DI',
        to: '#'
      }
    ]
  },
  {
    label: 'Contact',
    to: '/contact',
    active: route.path.startsWith('/contact')
  }
])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-8 lg:h-10 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
