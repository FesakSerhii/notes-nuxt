<script setup lang="ts">
import {useMainStore} from "~/stores";

const editor = ref();
const text = ref();
const store = useMainStore();
const {editActive} = storeToRefs(store);
const onChange = async () => {
  if(store.activeNote) {
    await store.updateNote(store.activeNote.id, text.value || '')
  }
}

watchEffect(() => {
  if(store.editActive) {
    text.value = store.activeNote?.text
  }
  if (editor.value && !store.searchQuery) {
    setTimeout(() => {
      editor.value.focus();
    }, 100)
  }
})

watch(editActive, () => {
  if (editor.value) {
    setTimeout(() => {
      editor.value.focus();
    }, 100)
  }

})

</script>

<template>
<div class="editor-wrap">
  <div class="markdown-body">
    <textarea
        ref="editor"
        v-model="text"
        class="editor-textarea"
        spellcheck="false"
        @input="onChange"
    />
  </div>

</div>
</template>

<style scoped lang="scss">
.editor {
  &-wrap {
    width: 100%;
    overflow: auto;
    height: calc(100vh - 170px);
    .markdown-body {
      height: 100%;
    }
  }
  &-textarea {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
  }
}
</style>
