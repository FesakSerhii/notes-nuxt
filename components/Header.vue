<script setup lang="ts">
import {useMainStore} from "~/stores";

const store = useMainStore();

const onEdit = () => {
  store.editActive = !store.editActive;
}
// watchEffect(() => {
//   console.log(store.activeNote);
// })
</script>

<template>
  <header class="header">
    <div class="header-nav">
      <template v-if="store.activeNote">
        <IconsEdit v-if="!store.editActive" class="icon-edit" @click="onEdit()"/>
        <IconsMd v-if="store.editActive" class="icon-edit" @click="onEdit()"/>
      </template>

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
