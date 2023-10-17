<script setup lang="ts">
import {useMainStore} from "~/stores";
import {useMedia} from "~/composables/useMedia";

const store = useMainStore();
const isTable = useMedia("(max-width: 992px)");
const veeConfirmRef = ref();
const router = useRouter();
const route = useRoute();
const onEdit = () => {
  store.editActive = !store.editActive;
}
const back = () => {
  store.activeNote = null;
  router.push(route.path);
}

const deleteNode = () => {
  veeConfirmRef.value
      .open("Delete", "Are you sure?")
      .then((confirm: any) => {
        if (confirm) {
          if (store.activeNote?.id) {
            store.deleteNote(store.activeNote.id)
            router.push(route.path);
          }
        }
      });
}
</script>

<template>
  <header class="header">
    <div class="header-nav">
      <template v-if="store.activeNote">
        <IconsLeftArrow v-if="isTable" class="icon-left" @click="back()"/>
        <div class="header-nav-info">
          <IconsEdit v-if="!store.editActive" class="icon-edit" @click="onEdit()"/>
          <IconsMd v-if="store.editActive" class="icon-edit" @click="onEdit()"/>

          <IconsTrash class="icon-delete" v-if="isTable" @click="deleteNode()"/>
        </div>
      </template>

    </div>
    <div class="header-search" >
      <Search v-if="!isTable" />
    </div>
  </header>

  <ModalsConfirmModal ref="veeConfirmRef"/>
</template>

<style scoped lang="scss">
@import "~/assets/scss/utils/_functions.scss";
  .header {
    display: flex;
    justify-content: space-between;
    &-nav {
      @media (max-width: 992px) {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .icon-edit {
    opacity: .3;
    width: clamp(12.5px , functions-vw(22px, 1920px), 22px);
    height: clamp(12.5px , functions-vw(22px, 1920px), 22px);
    cursor: pointer;
    transition: .3s;
    @media (max-width: 992px) {
      width: 22px;
      height: 22px
    }
    &:hover {
      opacity: 1;
    }
  }
  .icon-left {
    @media (min-width: 992px) {
      display: none;
    }
    width: 22px;
    height: 22px
  }
  .header-nav-info {
    @media (max-width: 992px) {
      display: flex;
      gap: 15px;
    }
  }
  .icon-delete {
    @media (max-width: 992px) {
      width: 24px;
      height: 24px;
    }
  }
</style>
