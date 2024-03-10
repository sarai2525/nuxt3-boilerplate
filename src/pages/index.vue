<template>
  <div>
    <h1>Index page</h1>
    <p v-if="isMobile">わわわ</p>
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
  console.log('🚀 ~ isMobile:', isMobile)
</script>
<style lang="scss" scoped>
  @include var.mq-down('sm') {
    p {
      font-size: 500px;
      color: red;
    }
  }
</style>
