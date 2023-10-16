<script setup lang="ts">

</script>

<template>
  <label>
    <IconsSearch class="icon-search"/>
    <input type="text" placeholder="Search">
  </label>
</template>

<style scoped lang="scss">
label {
  border-radius: 8px;
  width: 340px;
  border: 1px solid #ccc;
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  input {
    width: calc(100% - 30px);
    height: 100%;
    font-size: 16px;
  }
}
.icon-search {
  width: 24px;
  height: 24px;
  opacity: .5;
}
</style>
