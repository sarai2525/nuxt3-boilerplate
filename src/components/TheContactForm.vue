<template>
  <Form name="contact" @submit="navigateToConfirm">
    <div class="contact-form">
      <div v-for="item in formSchema" :key="item.name" class="contact-form-raw">
        <TheContactFormLabel :name="item.name">{{ item.label }}</TheContactFormLabel>
        <TheContactFormInput
          v-if="item.type === 'text'"
          v-model="formData[item.name]"
          :item="item"
          @update-state="updateState"
        />
        <TheContactFormRadio
          v-else-if="item.type === 'radio'"
          v-model="formData[item.name]"
          :item="item"
          @update-state="updateState"
        />
        <TheContactFormCheckbox
          v-else-if="item.type === 'checkbox'"
          v-model="formData[item.name]"
          :item="item"
          @update-checkbox="updateCheckbox"
        />
        <TheContactFormTextarea v-else v-model="formData[item.name]" :item="item" @update-state="updateState" />
      </div>
    </div>
    <button class="button">入力内容の確認</button>
  </Form>
</template>
<script setup lang="ts">
  import { Form } from 'vee-validate'
  import { formSchema } from '@/schema/contactForm'

  const { formData, updateState, updateCheckbox } = useContactForm()

  function navigateToConfirm() {
    navigateTo('/contact/confirm')
  }
</script>
