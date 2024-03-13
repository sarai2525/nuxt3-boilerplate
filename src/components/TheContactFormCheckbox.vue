<template>
  <div class="checkbox">
    <label v-for="(options, index) in item.options" :key="index" :for="options.label" class="label">
      <Field
        :id="options.label"
        v-model="modelValue"
        :value="options.value"
        :name="item.name"
        :rules="item.rules"
        :placeholder="item.placeholder"
        :class="item.element"
        :as="item.element"
        :type="item.type"
      />
      {{ options.label }}
    </label>
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
