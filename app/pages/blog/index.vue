<script setup lang="ts">
const { data: posts } = await useLazyAsyncData('posts', () => $fetch('https://jsonplaceholder.typicode.com/posts?_limit=10'))
</script>

<template>
  <UContainer>
    <UPageBody v-if="posts">
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="post.id"
          :to="`/blog/${post.id}`"
          :title="post.title"
          :description="post.body"
          :date="new Date().toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2'
          }"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
