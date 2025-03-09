import { z } from 'zod'
import { computed, type ComputedRef } from 'vue'

type OptionsType = {
  label: string
  value: string
}

// Zodスキーマ定義
export const contactFormSchema = z.object({
  name: z.string()
    .min(1, '必須項目です')
    .max(50, '50文字以内で入力してください'),
  email: z.string()
    .min(1, '必須項目です')
    .email('正しい形式で入力してください')
    .max(100, '100文字以内で入力してください'),
  subject: z.string()
    .min(1, '必須項目です'),
  checklist: z.array(z.string())
    .min(1, '必須項目です'),
  message: z.string()
    .min(1, '必須項目です')
    .max(1000, '1000文字以内で入力してください'),
})

// 型定義
export type ContactFormData = z.infer<typeof contactFormSchema>

// フォームフィールドの型定義を改善
export type FormSchemaType = {
  name: keyof ContactFormData
  label: string
  element: 'input' | 'textarea' | 'select'
  type?: 'text' | 'radio' | 'checkbox'
  placeholder?: string
  rules?: unknown
  options?: OptionsType[]
}

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
      rules: contactFormSchema.shape.name,
    },
    {
      name: 'email',
      label: 'メールアドレス',
      placeholder: 'taro.yamada@yamada.com',
      element: 'input',
      type: 'text',
      rules: contactFormSchema.shape.email,
    },
    {
      name: 'subject',
      label: '件名',
      placeholder: '件名を選択してください',
      element: 'input',
      type: 'radio',
      options: radioOptions,
      rules: contactFormSchema.shape.subject,
    },
    {
      name: 'checklist',
      label: 'チェックリスト',
      element: 'input',
      type: 'checkbox',
      options: checkboxOptions,
      rules: contactFormSchema.shape.checklist,
    },
    {
      name: 'message',
      label: 'お問い合わせ詳細',
      placeholder: 'お問い合わせ詳細を入力してください',
      element: 'textarea',
      rules: contactFormSchema.shape.message,
    },
  ]
})
