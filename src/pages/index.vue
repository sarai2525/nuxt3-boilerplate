import { useSeoMeta } from '#imports';
<template>
  <div>
    <h1>Index page</h1>
  </div>
</template>
<script lang="ts" setup>
  import { useSeoMeta } from '#imports'

  useSeoMeta({
    title: '',
    description: '',
    ogImage: '',
    ogUrl: '',
    robots: '',
  })
</script>
