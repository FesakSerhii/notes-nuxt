<script setup lang="ts">
import {useMainStore} from "~/stores";

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const {nodesAll} = useMainStore();

onBeforeMount(async () => {
  await nodesAll()
  if(route.query.id) {
    let id: number = Number(route.query.id)
    let note: any[] = store.notesList.filter((a: Note) => a.id === id)
    if(note.length) {
      store.setActiveNote(note[0]);
    } else {
      router.push(route.path)
    }
  }
});



</script>

<template>
  <NuxtLayout>
    <template #aside>
      <Aside />
    </template>
    <template #content>
      <div class="page">
        <div class="page-top">
          <Header />
        </div>
        <div class="page-editor">
          <Editor v-show="store.editActive" />
          <Preview v-show="!store.editActive" />
        </div>
      </div>
    </template>
  </NuxtLayout>

</template>

<style scoped lang="scss">
  @import "@/assets/scss/pages/home.scss";

</style>
