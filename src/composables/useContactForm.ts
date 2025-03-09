import { ref, reactive } from 'vue'
import { z } from 'zod'
import { contactFormSchema, type ContactFormData } from '~/schema/contactForm'

export const useContactForm = () => {
  const formData = reactive<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    checklist: [],
    message: '',
  })

  const errors = reactive<Record<keyof ContactFormData, string>>({
    name: '',
    email: '',
    subject: '',
    checklist: '',
    message: '',
  })

  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const submitError = ref<string | null>(null)

  const validateField = (field: keyof ContactFormData) => {
    try {
      const fieldSchema = z.object({ [field]: contactFormSchema.shape[field] })
      fieldSchema.parse({ [field]: formData[field] })
      errors[field] = ''
      return true
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === field)
        errors[field] = fieldError?.message || ''
      }
      return false
    }
  }

  const validateForm = () => {
    try {
      contactFormSchema.parse(formData)
      Object.keys(errors).forEach((key) => {
        errors[key as keyof ContactFormData] = ''
      })
      return true
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof ContactFormData
          if (field) {
            errors[field] = err.message
          }
        })
      }
      return false
    }
  }

  const submitForm = async () => {
    submitError.value = null

    if (!validateForm()) {
      return false
    }

    isSubmitting.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      isSubmitted.value = true
      return true
    }
    catch (error) {
      submitError.value = error instanceof Error
        ? error.message
        : '送信中にエラーが発生しました'
      return false
    }
    finally {
      isSubmitting.value = false
    }
  }

  const resetForm = () => {
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.checklist = []
    formData.message = ''
    Object.keys(errors).forEach((key) => {
      errors[key as keyof ContactFormData] = ''
    })
    isSubmitted.value = false
    submitError.value = null
  }

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    validateField,
    validateForm,
    submitForm,
    resetForm,
  }
}
