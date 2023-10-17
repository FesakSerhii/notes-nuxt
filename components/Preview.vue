<script setup lang="ts">
import {Remarkable} from 'remarkable';

import {useMainStore} from "~/stores";
const store = useMainStore();
const text = ref()

const md = new Remarkable({
  html: true,
  breaks: true,
  typographer: true
})

const parse = (text: string) => {
  return md.render(text)
}

onMounted(() => {
  if(store.activeNote) {
    text.value = store.activeNote?.text ? parse(store.activeNote?.text) : '';
  }
})
watchEffect(() => {
  text.value = store.activeNote?.text ? parse(store.activeNote?.text) : '';
  if(store.searchQuery && store.activeNote?.text) {
    const index = store.activeNote?.text.indexOf(store.searchQuery);
    text.value = parse(store.activeNote?.text.substring(0, index) + "<span class='highlight'>" + store.activeNote?.text.substring(index,index+store.searchQuery.length) + "</span>" + store.activeNote?.text.substring(index + store.searchQuery.length));
  }
})
</script>

<template>
  <div class="preview-wrap" v-if="text">
    <div class="markdown-body" v-html="text" />
  </div>
</template>

<style scoped lang="scss">
.preview-wrap {
  overflow: auto;
  height: calc(100vh - 170px);
}
</style>
