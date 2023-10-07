<template>
  <div>
    <h1>お問い合わせ</h1>
    <section class="section">
      <section class="section">
        <form method="post" :action="contactFormUrl" class="contact-form">
          <div class="contact-form-raw">
            <div class="label">お名前</div>
            <div class="input">{{ formData?.name ?? '' }}</div>
          </div>
          <div class="contact-form-raw">
            <div class="label">メールアドレス</div>
            <div class="input">{{ formData?.email ?? '' }}</div>
          </div>
          <div class="contact-form-raw">
            <div class="label">件名</div>
            <div class="input">{{ formData?.subject ?? '' }}</div>
          </div>
          <div class="contact-form-raw">
            <div class="label">お問い合わせ内容</div>
            <div class="textarea">{{ formData?.message ?? '' }}</div>
          </div>
          <button class="button">送信</button>
        </form>
      </section>
    </section>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useSeoMeta, useRuntimeConfig } from '#imports'
  import { useForm } from '@/composables/form'

  useSeoMeta({
    title: '',
    ogTitle: '',
    description: '',
    ogDescription: '',
    ogImage: '',
    robots: 'noindex',
  })

  const { formData } = useForm()

  const config = useRuntimeConfig()

  const contactFormUrl = computed(() => {
    return config.public.CONTACT_FORM_URL
  })
</script>
<style lang="scss" scoped>
  .section {
    text-align: center;
  }
</style>
