<template>
  <Form name="contact" class="contact-form" @submit="navigateToConfirm">
    <div v-for="(_, keyName) of formData" :key="keyName" class="contact-form-raw">
      <label :for="keyName" class="label">{{ formSchema[keyName].label }}</label>
      <Field
        :id="keyName"
        v-model="formData[keyName]"
        :name="keyName"
        :rules="formSchema[keyName].rules"
        :placeholder="formSchema[keyName].placeholder"
        :class="formSchema[keyName].element"
        :as="formSchema[keyName].element"
        @input="updateState(keyName, $event.target.value)"
        @change="updateState(keyName, $event.target.value)"
      />
      <ErrorMessage :name="keyName" as="p" class="error-message" />
    </div>
    <button class="button">入力内容の確認</button>
  </Form>
</template>
<script setup lang="ts">
  import { navigateTo } from '#imports'
  import { Field, Form, ErrorMessage } from 'vee-validate'
  import { useForm, formSchema } from '@/composables/form'

  const { formData, updateState } = useForm()

  function navigateToConfirm() {
    navigateTo('/contact/confirm')
  }
</script>
