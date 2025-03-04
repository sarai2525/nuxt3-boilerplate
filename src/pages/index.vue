<template>
  <div>
    <section>
      <h1>Index page</h1>
    </section>
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
</script>

<style lang="scss" module></style>
