<template>
  <div class="w-full h-full flex flex-col p-4 gap-8">
    <div class="w-full h-1/3 flex gap-8">
      <Card1 class="w-1/3 h-full" />
      <Card1 class="w-1/3 h-full" />
      <Card1 class="w-1/3 h-full" />
    </div>

    <div class="w-full h-full flex flex-col"></div>
  </div>
</template>

<script setup lang="ts">
import Card1 from './components/Card1.vue';
</script>

<style scoped></style>
