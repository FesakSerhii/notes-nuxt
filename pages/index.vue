<script setup lang="ts">

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

        </div>
      </div>
    </template>
  </NuxtLayout>

</template>

<style scoped lang="scss">
  @import "@/assets/scss/pages/home.scss";

</style>
