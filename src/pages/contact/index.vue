<template>
  <div>
    <h1>お問い合わせ</h1>
    <section class="section">
      <TheContactForm class="contact-form" />
    </section>
  </div>
</template>
<script setup lang="ts">
  import { useSeoMeta } from '#imports'
  import { useForm } from '@/composables/form'

  useSeoMeta({
    title: '',
    ogTitle: '',
    description: '',
    ogDescription: '',
    ogImage: '',
  })
  const { initializeForm } = useForm()
  initializeForm()
</script>
<style lang="scss" scoped>
  .section {
    text-align: center;
  }
</style>
