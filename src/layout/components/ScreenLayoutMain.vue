<template>
  <div class="w-full h-full flex flex-col">
    <!-- Header -->
    <div class="w-full h-1/12">
      <ScreenLayoutHeader />
    </div>

    <!-- Content -->
    <div class="w-full h-11/12 overflow-hidden">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScreenLayoutHeader from './ScreenLayoutHeader.vue';
</script>

<style scoped></style>
