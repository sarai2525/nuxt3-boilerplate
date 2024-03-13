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
  @include var.text-textarea;
  @include var.error-message;
</style>
