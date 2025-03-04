<template>
  <div>
    <section>
      <h1>お問い合わせ 入力内容確認</h1>
      <TheContactFormConfirm class="contact-form" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMeta } from '@/composables/useMeta'

useMeta({
  ogTitle: 'お問い合わせ 入力内容確認',
  ogSiteName: '',
  ogDescription: '',
  ogType: 'article',
  ogLocale: 'ja_JP',
  ogImage: '',
  ogUrl: '',
  robots: 'none',
})
</script>

<style lang="scss" module></style>
