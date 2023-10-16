<script setup lang="ts">

</script>

<template>
  <div class="wrap">
    <aside class="aside">
      <slot name="aside" />
    </aside>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .wrap {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  .aside {
    width: 460px;
    border-right: 1px solid #ccc;
    height: 100%;
    padding: 20px;
  }
  .content {
    width: calc(100% - 460px);
    padding: 20px;
  }
</style>
