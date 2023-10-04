<template>
  <div>
    <h1>Index page</h1>
  </div>
</template>
<script lang="ts" setup>
  import { useHeadMetas } from '~/composables/seoMeta'

  useHeadMetas({
    title: 'Index page',
    description: 'This is the index page',
    ogImage: 'https://nuxtjs.org/nuxt-card.png',
    ogUrl: 'https://nuxtjs.org',
    robots: 'noindex',
  })
</script>
