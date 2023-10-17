<script setup lang="ts">
import {useMainStore} from "~/stores";

const {editActive} = useMainStore();

const route = useRoute();

const {nodesAll} = useMainStore();
const id = ref(route.query.note);

onBeforeMount(async () => {
  await nodesAll()
});


watch(
    () => route.query,
    (query) => {id.value = query.note}
)


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
          <Editor v-show="editActive" />
          <Preview v-show="!editActive" />
        </div>
      </div>
    </template>
  </NuxtLayout>

</template>

<style scoped lang="scss">
  @import "@/assets/scss/pages/home.scss";

</style>
