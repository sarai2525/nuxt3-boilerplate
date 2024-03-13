<template>
  <label :for="props.name" class="label">
    <slot>ラベル</slot>
  </label>
</template>
<script lang="ts" setup>
  type PropType = {
    name: string
  }
  const props = defineProps<PropType>()
</script>
<style lang="scss" scoped>
  .label {
    @apply text-sm;
  }
</style>
