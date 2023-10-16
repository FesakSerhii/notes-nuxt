<template>
  <NuxtPage/>
</template>

<script setup lang="ts">
import {useMainStore} from "~/stores";
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
