<template>
  <div class="contact-form">
    <div
      v-if="isSubmitted"
      class="success-message"
    >
      <h3>お問い合わせありがとうございます</h3>
      <p>メッセージを受け付けました。担当者より折り返しご連絡いたします。</p>
      <button
        class="btn btn-primary mt-4"
        @click="resetForm"
      >
        新しいお問い合わせ
      </button>
    </div>

    <form
      v-else
      novalidate
      @submit.prevent="submitForm"
    >
      <div
        v-for="field in formFields"
        :key="field.name"
        class="form-group"
      >
        <label :for="field.name">{{ field.label }} <span
          v-if="field.rules"
          class="required"
        >*</span></label>
        <input
          v-if="field.element === 'input' && field.type === 'text'"
          :id="field.name"
          v-model="(formData as any)[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="form-control"
          :class="{ 'is-invalid': (errors as any)[field.name] }"
          @blur="validateField(field.name as keyof ContactFormData)"
        >
        <div
          v-else-if="field.element === 'input' && field.type === 'radio'"
          class="radio-group"
        >
          <div
            v-for="option in field.options"
            :key="option.value"
            class="form-check"
          >
            <input
              :id="`${field.name}-${option.value}`"
              v-model="(formData as any)[field.name]"
              :name="field.name"
              type="radio"
              :value="option.value"
              class="form-check-input"
              @blur="validateField(field.name as keyof ContactFormData)"
            >
            <label
              :for="`${field.name}-${option.value}`"
              class="form-check-label"
            >{{ option.label }}</label>
          </div>
        </div>
        <div
          v-else-if="field.element === 'input' && field.type === 'checkbox'"
          class="checkbox-group"
        >
          <div
            v-for="option in field.options"
            :key="option.value"
            class="form-check"
          >
            <input
              :id="`${field.name}-${option.value}`"
              v-model="(formData as any)[field.name]"
              type="checkbox"
              :value="option.value"
              class="form-check-input"
              @blur="validateField(field.name as keyof ContactFormData)"
            >
            <label
              :for="`${field.name}-${option.value}`"
              class="form-check-label"
            >{{ option.label }}</label>
          </div>
        </div>
        <textarea
          v-else-if="field.element === 'textarea'"
          :id="field.name"
          v-model="(formData as any)[field.name]"
          :placeholder="field.placeholder"
          class="form-control"
          :class="{ 'is-invalid': (errors as any)[field.name] }"
          rows="5"
          @blur="validateField(field.name as keyof ContactFormData)"
        />

        <div
          v-if="(errors as any)[field.name]"
          class="invalid-feedback"
        >
          {{ (errors as any)[field.name] }}
        </div>
      </div>

      <div
        v-if="submitError"
        class="alert alert-danger"
      >
        {{ submitError }}
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          送信中...
        </span>
        <span v-else>送信する</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useContactForm } from '~/composables/useContactForm'
import { formSchema, type ContactFormData } from '~/schema/contactForm'

const {
  formData,
  errors,
  isSubmitting,
  isSubmitted,
  submitError,
  validateField,
  submitForm,
  resetForm,
} = useContactForm()

const formFields = formSchema
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.required {
  color: #dc3545;
}
</style>
