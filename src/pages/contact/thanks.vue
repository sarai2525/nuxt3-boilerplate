<template>
  <div>
    <section>
      <h1>お問い合わせ</h1>
      <p>お問い合わせいただきありがとうございました</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMeta } from '@/composables/useMeta'

useMeta({
  ogTitle: 'お問い合わせ 完了',
  ogSiteName: '',
  ogDescription: '',
  ogType: 'article',
  ogLocale: 'ja_JP',
  ogImage: '',
  ogUrl: '',
  robots: 'none',
})
const { initializeForm } = useContactForm()
initializeForm()
</script>

<style lang="scss" module></style>
