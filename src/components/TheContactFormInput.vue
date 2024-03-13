<template>
  <div class="w-full">
    <Field
      :id="item.name"
      v-model="modelValue"
      :name="item.name"
      :rules="item.rules"
      :placeholder="item.placeholder"
      :class="item.element"
      :as="item.element"
      :type="item.type"
    />
    <ErrorMessage :name="item.name" as="p" class="error-message" />
  </div>
</template>
<script setup lang="ts">
  import { Field, ErrorMessage } from 'vee-validate'
  import { type FormSchemaType } from '@/schema/contactForm'

  type PropType = {
    item: FormSchemaType
  }
  const modelValue = defineModel<string | readonly string[]>()
  const props = defineProps<PropType>()
  const item = computed(() => props.item)
</script>
<style lang="scss" scoped>
  .input {
    @apply w-full p-2 text-sm border border-slate-300 border-solid rounded-md;
  }
  .error-message {
    @include var.error-message;
  }
</style>
