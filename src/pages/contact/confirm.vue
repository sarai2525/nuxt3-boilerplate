<template>
  <div>
    <h1>お問い合わせ</h1>
    <section class="section">
      <form method="post" :action="contactFormUrl" class="contact-form">
        <div v-for="(_, keyName) of formData" :key="keyName" class="contact-form-raw">
          <p class="label">{{ formSchema[keyName].label }}</p>
          <p>{{ formData[keyName] }}</p>
        </div>
        <button class="button">送信</button>
      </form>
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

  const { formData } = useContactForm()

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
