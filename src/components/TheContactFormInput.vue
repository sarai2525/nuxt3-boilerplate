<template>
  <div>
    <Field
      :id="item.name"
      v-model="modelValue"
      :name="item.name"
      :rules="item.rules"
      :placeholder="item.placeholder"
      :class="$style.input"
      :as="item.element"
      :type="item.type"
    />
    <ErrorMessage :name="item.name" as="p" :class="$style.errorMessage" />
  </div>
</template>
<script setup lang="ts">
  import { Field, ErrorMessage } from 'vee-validate'
  import { type FormSchemaType } from '@/schema/contactForm'

  type PropType = {
    item: FormSchemaType
  }
  defineProps<PropType>()
  const modelValue = defineModel<string | readonly string[]>()
</script>
<style lang="scss" module>
  .input {
    @apply w-full p-2 text-sm border border-slate-300 border-solid rounded-md;
  }
  .errorMessage {
    @include var.error-message;
  }
</style>
