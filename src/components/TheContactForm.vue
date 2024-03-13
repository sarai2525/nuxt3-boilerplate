<template>
  <Form name="contact" @submit="navigateToConfirm">
    <div class="contact-form">
      <div v-for="item in formSchema" :key="item.name" class="row">
        <TheContactFormLabel :name="item.name" class="label">{{ item.label }}</TheContactFormLabel>
        <TheContactFormInput v-if="item.type === 'text'" v-model="form[item.name]" :item="item" class="input-element" />
        <TheContactFormRadio
          v-else-if="item.type === 'radio'"
          v-model="form[item.name]"
          :item="item"
          class="input-element"
        />
        <TheContactFormCheckbox
          v-else-if="item.type === 'checkbox'"
          v-model="form[item.name]"
          :item="item"
          class="input-element"
        />
        <TheContactFormTextarea v-else v-model="form[item.name]" :item="item" class="input-element" />
      </div>
      <TheSubmitButton class="button-area">確認</TheSubmitButton>
    </div>
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
<style lang="scss" scoped>
  .contact-form {
    @apply max-w-2xl w-full;
    margin: 0 auto;
  }
  .row {
    @apply flex flex-col pt-6 pb-6;
    &:not(:first-child) {
      @apply border-t border-gray-300;
    }
  }
  .label {
    flex: 0 0 33%;
  }
  .input-element {
    @apply mt-2;
  }
  .button-area {
    @apply mt-4;
  }
</style>
