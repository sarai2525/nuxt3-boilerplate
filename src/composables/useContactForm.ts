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
    Object.keys(modelValue).forEach((key) => {
      formData.value[key] = modelValue[key]
    })
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
