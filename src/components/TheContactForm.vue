<template>
  <Form name="contact" @submit="navigateToConfirm">
    <div v-for="item in formSchema" :key="item.name">
      <TheContactFormLabel :name="item.name">{{ item.label }}</TheContactFormLabel>
      <TheContactFormInput v-if="item.type === 'text'" v-model="form[item.name]" :item="item" />
      <TheContactFormRadio v-else-if="item.type === 'radio'" v-model="form[item.name]" :item="item" />
      <TheContactFormCheckbox v-else-if="item.type === 'checkbox'" v-model="form[item.name]" :item="item" />
      <TheContactFormTextarea v-else v-model="form[item.name]" :item="item" />
    </div>
    <TheSubmitButton>確認</TheSubmitButton>
  </Form>
</template>
<script setup lang="ts">
  import { Form } from 'vee-validate'
  import { formSchema } from '@/schema/contactForm'

  const { updateState } = useContactForm()
  const form = ref<FormType>({ name: '', email: '', subject: '', checklist: [], message: '' })

  async function navigateToConfirm() {
    await updateState(form.value)
    navigateTo('/contact/confirm')
  }
</script>
<style lang="scss" module></style>
