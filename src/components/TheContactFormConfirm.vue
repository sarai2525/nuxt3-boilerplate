<template>
  <Form
    name="contact"
    method="post"
    :action="contactFormUrl"
  >
    <div
      v-for="(item, index) in formSchema"
      :key="index"
    >
      <TheContactFormLabel :name="item.name">
        {{ item.label }}
      </TheContactFormLabel>
      <textarea
        v-if="item.element === 'textarea'"
        :name="item.label"
        :value="formData[item.name]"
        readonly
      />
      <input
        v-else
        :name="item.label"
        :value="formData[item.name]"
        class="input"
        readonly
      >
    </div>
    <TheSubmitButton>送信</TheSubmitButton>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { formSchema } from '@/schema/contactForm'

const { formData } = useContactForm()
const config = useRuntimeConfig()
const contactFormUrl = config.public.CONTACT_FORM_URL
</script>

<style lang="scss" module></style>
