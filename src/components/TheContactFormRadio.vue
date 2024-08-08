<template>
  <div>
    <label v-for="(options, index) in item.options" :key="index" :for="options.label">
      <Field
        :id="options.label"
        v-model="modelValue"
        :value="options.value"
        :name="item.name"
        :rules="item.rules"
        :placeholder="item.placeholder"
        :as="item.element"
        :type="item.type"
      />
      {{ options.label }}
    </label>
  </div>
  <ErrorMessage :name="item.name" as="p" />
</template>
<script setup lang="ts">
  import { Field, ErrorMessage } from 'vee-validate'
  import type { FormSchemaType } from '@/schema/contactForm'

  type PropType = {
    item: FormSchemaType
  }
  defineProps<PropType>()
  const modelValue = defineModel<string | readonly string[]>()
</script>
<style lang="scss" module></style>
