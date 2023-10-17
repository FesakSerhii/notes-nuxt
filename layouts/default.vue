<script setup lang="ts">

import {useMainStore} from "~/stores";
const isAside = ref(true)
const store = useMainStore();
const {activeNote} = storeToRefs(store);

onMounted(() => {
  isAside.value = !activeNote.value
})
watch(activeNote, () => {
  setTimeout(() => {
    isAside.value = !activeNote.value;
  }, 100)
})
</script>

<template>
  <div class="wrap">
    <aside class="aside" :class="{'active': isAside}">
      <slot name="aside" />
    </aside>
    <div class="content" :class="{'active': !isAside}">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/scss/utils/_functions.scss";
  .wrap {
    display: flex;
    width: 100%;
    height: 100vh;
    @media (max-width: 992px) {
      overflow: hidden;
    }
  }
  .aside {
    width: clamp(300px , functions-vw(460px, 1920px), 460px);
    border-right: 1px solid #ccc;
    height: 100%;
    padding: 20px;
    @media (max-width: 992px) {
      left: -100vw;
      position: absolute;
      border-right: none;
      transition: .3s;
      padding: 10px;
      &.active {
        width: 100vw;
        left: 0;
      }
    }
  }
  .content {
    width: calc(100% - clamp(300px , functions-vw(460px, 1920px), 460px));
    padding: clamp(10px , functions-vw(20px, 1920px), 20px);
    @media (max-width: 992px) {
      left: 100vw;
      width: 100%;
      position: relative;
      transition: .3s;
      &.active {
        width: 100vw;
        left: 0;
      }
    }
  }
</style>
