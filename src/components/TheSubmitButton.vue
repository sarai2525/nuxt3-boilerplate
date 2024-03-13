<template>
  <div :class="$style.buttonArea">
    <button :class="$style.button"><slot>ぼたん</slot></button>
  </div>
</template>
<style lang="scss" module>
  .buttonArea {
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
