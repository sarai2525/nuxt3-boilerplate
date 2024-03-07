<template>
  <div class="radio">
    <label v-for="(options, index) in item.options" :key="index" :for="options.label" class="label">
      <Field
        :id="options.label"
        :value="options.value"
        :name="item.name"
        :rules="item.rules"
        :placeholder="item.placeholder"
        :class="item.element"
        :as="item.element"
        :type="item.type"
        @input="updateState(item.name, $event.target.value)"
        @change="updateState(item.name, $event.target.value)"
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
    modelValue: string | readonly string[]
    item: FormSchemaType
  }
  const props = defineProps<PropType>()
  const item = computed(() => props.item)
  const emit = defineEmits<{
    updateState: [name: string, value: string]
  }>()

  function updateState(name: string, value: string) {
    emit('updateState', name, value)
  }
</script>
