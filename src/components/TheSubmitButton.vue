<template>
  <div class="the-submit-button">
    <button class="button"><slot>ぼたん</slot></button>
  </div>
</template>
<style lang="scss" scoped>
  .the-submit-button {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .button {
    @apply w-6/12 p-2 text-base border border-slate-800 border-solid rounded;
    &:hover {
      opacity: 0.8;
    }
  }
</style>
