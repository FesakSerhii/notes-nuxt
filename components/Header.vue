<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="header-nav">
      <IconsEdit class="icon-edit"/>
    </div>
    <div class="header-search">
      <Search />
    </div>
  </header>
</template>

<style scoped lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
  }
  .icon-edit {
    opacity: .3;
    width: 22px;
    height: 22px;
    cursor: pointer;
    transition: .3s;
    &:hover {
      opacity: 1;
    }
  }
</style>
