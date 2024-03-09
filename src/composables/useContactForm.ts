type FormType = {
  [key: string]: string | string[]
}

const initialState: FormType = {
  name: '',
  email: '',
  subject: '',
  checklist: [],
  message: '',
}

export const useContactForm = () => {
  const formData = useState<FormType>('contact_form', () => initialState)
  function updateState(key: string | number, value: string) {
    formData.value[key] = value
  }
  function updateCheckbox(key: string, value: string, checked: boolean) {
    const checkbox = formData.value[key] as string[]
    if (checked === true) {
      formData.value[key] = [...checkbox, value]
      return
    }
    formData.value[key] = checkbox.filter((v: string) => v !== value)
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
    updateCheckbox,
    resetForm,
    initializeForm,
  }
}
