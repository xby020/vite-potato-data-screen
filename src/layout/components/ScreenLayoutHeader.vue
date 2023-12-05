<template>
  <div class="w-full h-full relative flex justify-center items-center">
    <!-- Bg -->
    <div class="absolute z-1 w-full h-full"></div>

    <!-- Side -->
    <div class="absolute z-2 w-full h-full flex justify-between items-center px-4">
      <!-- left -->
      <div>left content</div>

      <!-- right -->
      <div>right content</div>
    </div>

    <!-- Title -->
    <div class="relative z-3 font-jd text-3xl text-gradient-blue">
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const title = ref(import.meta.env.VITE_APP_TITLE);
</script>

<style scoped></style>
