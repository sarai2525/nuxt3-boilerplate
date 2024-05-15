import { string, array } from 'yup'

type OptionsType = {
  label: string
  value: string
}

export type FormSchemaType = {
  name: string
  label: string
  element: 'input' | 'textarea' | 'select'
  type?: 'text' | 'radio' | 'checkbox'
  placeholder?: string
  rules?: unknown
  options?: OptionsType[]
}

const required = string().required('必須項目です')
const email = string().email('正しい形式で入力してください').required('必須項目です')
const checkbox = array().required('必須項目です')
const radioOptions: OptionsType[] = [
  { label: 'お問い合わせ', value: 'お問い合わせ' },
  { label: 'ご意見', value: 'ご意見' },
  { label: 'その他', value: 'その他' },
]
const checkboxOptions: OptionsType[] = [
  { label: 'XXX', value: 'xxx' },
  { label: 'YYY', value: 'yyy' },
  { label: 'ZZZ', value: 'zzz' },
]

export const formSchema: ComputedRef<FormSchemaType[]> = computed(() => {
  return [
    {
      name: 'name',
      label: 'お名前',
      placeholder: '山田太郎',
      element: 'input',
      type: 'text',
      rules: required,
    },
    {
      name: 'email',
      label: 'メールアドレス',
      placeholder: 'taro.yamada@yamada.com',
      element: 'input',
      type: 'text',
      rules: email,
    },
    {
      name: 'subject',
      label: '件名',
      placeholder: '件名を選択してください',
      element: 'input',
      type: 'radio',
      options: radioOptions,
      rules: required,
    },
    {
      name: 'checklist',
      label: 'チェックリスト',
      element: 'input',
      type: 'checkbox',
      options: checkboxOptions,
      rules: checkbox,
    },
    {
      name: 'message',
      label: 'お問い合わせ詳細',
      placeholder: 'お問い合わせ詳細を入力してください',
      element: 'textarea',
      rules: required,
    },
  ]
})
