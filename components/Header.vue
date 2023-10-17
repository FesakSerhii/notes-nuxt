<script setup lang="ts">
import {useMainStore} from "~/stores";

const store = useMainStore();

const onEdit = () => {
  store.editActive = !store.editActive;
}

</script>

<template>
  <header class="header">
    <div class="header-nav">
      <IconsEdit v-if="store.activeNote && !store.editActive" class="icon-edit" @click="onEdit()"/>
      <IconsMd v-if="store.activeNote && store.editActive" class="icon-edit" @click="onEdit()"/>
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
