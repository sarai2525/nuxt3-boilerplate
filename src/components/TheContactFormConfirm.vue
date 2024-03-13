<template>
  <Form name="contact" method="post" :action="contactFormUrl">
    <div class="contact-form">
      <div v-for="(item, index) in formSchema" :key="index">
        <div v-if="item.element === 'textarea'" class="contact-form-row">
          <TheContactFormLabel :name="item.name">{{ item.label }}</TheContactFormLabel>
          <textarea :name="item.label" :value="formData[item.name]" class="textarea" readonly />
        </div>
        <div v-else class="contact-form-row">
          <TheContactFormLabel :name="item.name">{{ item.label }}</TheContactFormLabel>
          <input :name="item.label" :value="formData[item.name]" class="input" readonly />
        </div>
      </div>
    </div>
    <button class="button">入力内容の確認</button>
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
  .input,
  .textarea {
    &:hover {
      cursor: not-allowed;
    }
  }
</style>
