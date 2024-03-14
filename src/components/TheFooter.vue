<template>
  <footer class="footer">
    <div class="footer-inner">
      Footer
      <small v-if="appEnv === 'dev'">{{ appEnv }}</small>
    </div>
  </footer>
</template>
<script lang="ts" setup>
  const config = useRuntimeConfig()
  const appEnv = config.public.APP_ENV
</script>
<style lang="scss" scoped>
  small {
    display: block;
    font-size: 16px;
    color: crimson;
  }
</style>
