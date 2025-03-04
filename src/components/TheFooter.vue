<template>
  <footer>
    <div>
      Footer
      <small
        v-if="appEnv === 'dev'"
        :class="$style.appEnv"
      >{{ appEnv }}</small>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const appEnv = config.public.APP_ENV
</script>

<style lang="scss" module>
  .appEnv {
    display: block;
    font-size: 16px;
    color: crimson;
  }
</style>
