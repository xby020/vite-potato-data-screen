<template>
  <div class="relative w-screen h-screen bg-slate-900 text-white overflow-hidden">
    <!-- background/map -->
    <div class="absolute top-0 left-0 w-full h-full z-0"></div>

    <!-- dark corner -->
    <div class="absolute z-1 top-0 left-0 w-screen h-screen pointer-events-none dark-corner pointer-events-none"></div>

    <!-- content -->
    <div class="relative z-2 overflow-hidden transform-gpu content-scale flex flex-col justify-start items-center" :style="scaleStyle">
      <screen-layout-main>
        <router-view></router-view>
      </screen-layout-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import ScreenLayoutMain from './components/ScreenLayoutMain.vue';

// Physical screen size
const screenWidth = ref(1920);
const screenHeight = ref(1080);

const { width, height } = useWindowSize();

const scaleStyle = computed(() => {
  const wr = width.value / 1920;
  const hr = height.value / 1080;
  return {
    width: `${screenWidth.value}px`,
    height: `${screenHeight.value}px`,
    transform: `scale(${wr}, ${hr})`,
  };
});
</script>

<style lang="pcss" scoped>
.content-scale {
  transform-origin: 0% 0px;
}

.dark-corner {
  box-shadow: 0 0 100px 70px rgba(0, 0, 0, 1) inset;
}
</style>
