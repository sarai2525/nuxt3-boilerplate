<template>
  <div>
    <h1>Index page</h1>
    <p>{{ data }}</p>
  </div>
</template>
<script lang="ts" setup>
  import { useMeta } from '~/composables/useMeta'

  useMeta({
    ogTitle: 'サイト名',
    ogDescription: 'サイトディスクリプション',
    ogSiteName: 'サイト名',
    ogImage: 'OGP画像',
    ogUrl: 'サイトURL',
    ogType: 'website',
    robots: 'all',
  })

  const { isMobile } = useDevice()

  const data = {
    title: isMobile ? 'is mobile' : 'is not mobile',
  }
</script>
<style lang="scss" scoped>
  p {
    color: red;
  }
</style>
