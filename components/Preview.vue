<script setup lang="ts">
import {Remarkable} from 'remarkable';

import {useMainStore} from "~/stores";
const store = useMainStore();
const text = ref('')

const md = new Remarkable({
  html: true,
  breaks: true,
  typographer: true
})

const parse = (text: string) => {
  return md.render(text)
}
watchEffect(() => {
  text.value = store.activeNote?.text ? parse(store.activeNote?.text) : '';
})
</script>

<template>
  <div class="preview-wrap">
    <div class="markdown-body"
        :class="{ active: !store.editActive }"
        v-html="text"
    />
  </div>
</template>

<style scoped lang="scss">
.preview-wrap {
  overflow: auto;
  height: calc(100vh - 170px);
}
</style>
