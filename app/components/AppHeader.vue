<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    label: 'Accueil',
    to: '/home',
    active: route.path.startsWith('/home')
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
        label: 'Organisation',
        to: '/dgml/organisation'
      },
      {
        label: 'Missions',
        to: '/dgml/missions'
      }
    ]
  },
  {
    label: 'Actualités',
    to: '/blog'
  },
  {
    label: 'Documenthèque',
    to: '/documentheque'
  },
  {
    label: 'Directions',
    active: route.path.startsWith('/directions'),
    children: [
      {
        label: 'Direction Financière',
        to: '/directions/finance'
      },
      {
        label: 'Direction RH',
        to: '/directions/rh'
      },
      {
        label: 'Direction IT',
        to: '/directions/it'
      }
    ]
  },
  {
    label: 'Contact',
    to: '/contact'
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

      <USeparator class="my-6" />

      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/signup"
        block
      />
    </template>
  </UHeader>
</template>
