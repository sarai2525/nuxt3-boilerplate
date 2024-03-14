<template>
  <label :for="name" :class="$style.label">
    <slot>ラベル</slot>
  </label>
</template>
<script lang="ts" setup>
  type PropType = {
    name: string
  }
  defineProps<PropType>()
</script>
<style lang="scss" module></style>
