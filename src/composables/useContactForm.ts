export type FormType = {
  [key: string]: string | string[]
}

export const initialState: FormType = {
  name: '',
  email: '',
  subject: '',
  checklist: [],
  message: '',
}

export const useContactForm = () => {
  const formData = useState<FormType>('contact_form', () => initialState)
  function updateState(modelValue: FormType) {
    console.log('🚀 ~ updateState ~ modelValue:', modelValue)
    formData.value = modelValue
  }
  function resetForm() {
    clearNuxtState('contact_form')
  }
  function initializeForm() {
    onBeforeMount(() => {
      resetForm()
    })
  }
  return {
    formData: readonly(formData),
    updateState,
    resetForm,
    initializeForm,
  }
}
