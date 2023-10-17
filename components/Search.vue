<script setup lang="ts">
import {useMainStore} from "~/stores";

const store = useMainStore();
const input = ref('');
const {searchQuery} = storeToRefs(store);
const search = async () => {
  store.setSearchText(input.value)
}

watch(searchQuery, () => {
  if (searchQuery && searchQuery.value.length === 0) {
    setTimeout(() => {
      input.value = '';
    }, 100)
  }

})
</script>

<template>
  <label>
    <IconsSearch class="icon-search"/>
    <input type="text"
           v-model="input"
           placeholder="Search"
           @input="search">
  </label>
</template>

<style scoped lang="scss">
@import "~/assets/scss/utils/_functions.scss";
label {
  border-radius: 8px;
  width: clamp(170px , functions-vw(340px, 1920px), 340px);
  border: 1px solid #ccc;
  height: clamp(25px , functions-vw(40px, 1920px), 40px);
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: clamp(4px , functions-vw(8px, 1920px), 8px);
  padding: clamp(4px , functions-vw(8px, 1920px), 8px);
  input {
    width: calc(100% - clamp(15px , functions-vw(30px, 1920px), 30px));
    height: 100%;
    font-size: clamp(14px , functions-vw(16px, 1920px), 16px);
  }
}
.icon-search {
  width: clamp(12px , functions-vw(24px, 1920px), 24px);
  height: clamp(12px , functions-vw(24px, 1920px), 24px);
  opacity: .5;
}
</style>
