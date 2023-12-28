<template>
  <div class="w-full h-full relative flex justify-center items-center">
    <!-- Bg -->
    <div class="absolute z-1 w-full h-full"></div>

    <!-- Side -->
    <div class="absolute z-2 w-full h-full flex justify-between items-center px-4">
      <!-- left -->
      <div class="flex gap-2 items-center">
        <!-- content -->
        <div></div>

        <!-- hide control -->
        <div class="flex gap-2 items-center opacity-0 hover:(opacity-100)">
          <screen-layout-control></screen-layout-control>
        </div>
      </div>

      <!-- right -->
      <div class="flex gap-4 items-center">
        <!-- time -->
        <div class="flex items-center">
          <span>{{ time }}</span>
          <span>{{ week }}</span>
          <span>{{ date }}</span>
        </div>

        <!-- weather -->
        <div class="flex gap-2 items-center">
          <img :src="weatherIconUrl" class="w-10 h-10 object-cover" alt="weather" />
          <span>{{ temp }}℃</span>
        </div>
      </div>
    </div>

    <!-- Title -->
    <div class="relative z-3 font-jd text-3xl text-gradient-blue">
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import localZH from 'dayjs/locale/zh-cn';
import ScreenLayoutControl from './ScreenLayoutControl.vue';

dayjs.locale(localZH);

const title = ref(import.meta.env.VITE_APP_TITLE);

const time = ref(dayjs().format('HH:mm:ss'));
const week = ref(dayjs().format('dddd'));
const date = ref(dayjs().format('YYYY-MM-DD'));

const timer = ref<NodeJS.Timeout>();

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = dayjs().format('HH:mm:ss');
    week.value = dayjs().format('dddd');
    date.value = dayjs().format('YYYY-MM-DD');
  }, 1000);
});

const temp = ref(24);
const weatherIconUrl = ref('https://img.xby020.cn/i/2023/12/25/658946f468eb1.png');
</script>

<style scoped></style>
