<template>
  <Form name="contact" @submit="navigateToConfirm">
    <div class="contact-form">
      <div v-for="item in formSchema" :key="item.name" class="contact-form-raw">
        <TheContactFormLabel :name="item.name">{{ item.label }}</TheContactFormLabel>
        <TheContactFormInput v-if="item.type === 'text'" v-model="form[item.name]" :item="item" />
        <TheContactFormRadio v-else-if="item.type === 'radio'" v-model="form[item.name]" :item="item" />
        <TheContactFormCheckbox v-else-if="item.type === 'checkbox'" v-model="form[item.name]" :item="item" />
        <TheContactFormTextarea v-else v-model="form[item.name]" :item="item" />
      </div>
    </div>
    <button class="button">入力内容の確認</button>
  </Form>
</template>
<script setup lang="ts">
  import { Form } from 'vee-validate'
  import { formSchema } from '@/schema/contactForm'

  type FormType = {
    [key: string]: string | string[]
  }

  const { updateState } = useContactForm()
  const form = ref<FormType>({ name: '', email: '', subject: '', checklist: [], message: '' })
  function navigateToConfirm() {
    updateState(form.value)
  }
</script>
