<template>
  <header :class="$style.header">
    <div :class="$style.headerInner">Header</div>
  </header>
</template>
<style lang="scss" module>
  .headerInner {
    @apply w-9/12 mx-auto;
  }
</style>
