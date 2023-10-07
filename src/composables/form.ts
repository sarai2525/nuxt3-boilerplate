import { useState, onBeforeMount } from '#imports'
import { readonly, computed, ComputedRef } from 'vue'
import { string } from 'yup'

type Form = {
  [key: string]: string
}

type FormSchema = {
  [key: string]: {
    label: string
    placeholder: string
    element: string
    rules?: any
  }
}

export const formSchema: ComputedRef<FormSchema> = computed(() => {
  const required = string().required('必須項目です')
  const email = string().email('正しい形式で入力してください').required('必須項目です')

  return {
    name: {
      label: 'お名前',
      placeholder: '山田太郎',
      element: 'input',
      rules: required,
    },
    email: {
      label: 'メールアドレス',
      placeholder: 'taro.yamada@yamada.com',
      element: 'input',
      rules: email,
    },
    subject: {
      label: '件名',
      placeholder: '件名を入力してください',
      element: 'input',
      rules: required,
    },
    message: {
      label: 'お問い合わせ内容',
      placeholder: 'お問い合わせ内容を入力してください',
      element: 'textarea',
      rules: required,
    },
  }
})

const initialState: Form = Object.keys(formSchema.value).reduce((acc, key) => {
  acc[key] = ''
  return acc
}, {} as Form)

export const useForm = () => {
  const formData = useState<Form>('form_data', () => initialState)
  function updateState(key: string | number, value: string) {
    formData.value[key] = value
  }
  function resetForm() {
    Object.assign(formData.value, initialState)
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
