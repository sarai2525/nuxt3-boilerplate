<template>
  <div>
    <div :class="$style.radio">
      <label v-for="(options, index) in item.options" :key="index" :for="options.label" :class="$style.label">
        <Field
          :id="options.label"
          v-model="modelValue"
          :value="options.value"
          :name="item.name"
          :rules="item.rules"
          :placeholder="item.placeholder"
          :class="$style.input"
          :as="item.element"
          :type="item.type"
        />
        {{ options.label }}
      </label>
    </div>
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
  .radio {
    @apply flex;
  }
  .label {
    @apply flex text-sm;
    &:not(:first-child) {
      @apply ml-4;
    }
  }
  .input {
    @apply mr-2;
  }
  .errorMessage {
    @include var.error-message;
  }
</style>
