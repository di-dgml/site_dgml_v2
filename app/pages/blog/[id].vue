<script setup>
const route = useRoute()
const {data: post} = await useFetch(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
</script>

<template>
  <UContainer>
    <UPageBody v-if="post">
      <article class="prose lg:prose-xl mx-auto">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
      </article>
    </UPageBody>
    <div v-else class="text-center py-10">
      Chargement de l'article...
    </div>
  </UContainer>
</template>
