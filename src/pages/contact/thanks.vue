<template>
  <div>
    <h1>お問い合わせ</h1>
    <section class="section">
      <p>お問い合わせいただきありがとうございました</p>
    </section>
  </div>
</template>
<script setup lang="ts">
  useSeoMeta({
    title: '',
    ogTitle: '',
    description: '',
    ogDescription: '',
    ogImage: '',
    robots: 'noindex',
  })
  const { initializeForm } = useContactForm()
  initializeForm()
</script>
<style lang="scss" scoped>
  .section {
    text-align: center;
  }
</style>
