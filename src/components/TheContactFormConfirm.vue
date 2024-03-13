<template>
  <Form name="contact" method="post" :action="contactFormUrl">
    <div class="contact-form">
      <div v-for="(item, index) in formSchema" :key="index" class="row">
        <TheContactFormLabel :name="item.name">{{ item.label }}</TheContactFormLabel>
        <textarea
          v-if="item.element === 'textarea'"
          :name="item.label"
          :value="formData[item.name]"
          class="textarea"
          readonly
        />
        <input v-else :name="item.label" :value="formData[item.name]" class="input" readonly />
      </div>
    </div>
    <button class="button">送信</button>
  </Form>
</template>
<script setup lang="ts">
  import { Form } from 'vee-validate'
  import { formSchema } from '@/schema/contactForm'

  const { formData } = useContactForm()
  const config = useRuntimeConfig()
  const contactFormUrl = config.public.CONTACT_FORM_URL
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/form.scss';
  .contact-form {
    @apply flex flex-col max-w-2xl w-full;
    margin: 0 auto;
  }
</style>
