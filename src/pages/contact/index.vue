<template>
  <div>
    <section :class="$style.section">
      <h1>お問い合わせ</h1>
      <TheContactForm />
    </section>
  </div>
</template>
<script setup lang="ts">
  import { useMeta } from '@/composables/useMeta'
  useMeta({
    ogTitle: 'お問い合わせ',
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
e
<style lang="scss" module>
  .section {
    @apply w-9/12 mx-auto;
  }
</style>
