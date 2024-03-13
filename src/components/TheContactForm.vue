<template>
  <Form name="contact" @submit="navigateToConfirm">
    <div :class="$style.contactForm">
      <div v-for="item in formSchema" :key="item.name" :class="$style.row">
        <TheContactFormLabel :name="item.name">{{ item.label }}</TheContactFormLabel>
        <TheContactFormInput
          v-if="item.type === 'text'"
          v-model="form[item.name]"
          :item="item"
          :class="$style.inputElement"
        />
        <TheContactFormRadio
          v-else-if="item.type === 'radio'"
          v-model="form[item.name]"
          :item="item"
          :class="$style.inputElement"
        />
        <TheContactFormCheckbox
          v-else-if="item.type === 'checkbox'"
          v-model="form[item.name]"
          :item="item"
          :class="$style.inputElement"
        />
        <TheContactFormTextarea v-else v-model="form[item.name]" :item="item" :class="$style.inputElement" />
      </div>
      <TheSubmitButton :class="$style.buttonArea">確認</TheSubmitButton>
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
<style lang="scss" module>
  .contactForm {
    @apply max-w-2xl w-full mx-auto;
  }
  .row {
    @apply flex flex-col pt-6 pb-6;
    &:not(:first-child) {
      @apply border-t border-gray-300;
    }
  }
  .inputElement {
    @apply mt-2;
  }
  .buttonArea {
    @apply mt-4;
  }
</style>
