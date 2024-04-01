<template>
  <div class="flex gap-2 items-center">
    <n-button v-for="(item, index) in routeList" :key="index" ghost :type="index === currentRouteIndex ? 'warning' : 'default'" @click="routeIndex = index.toString()">{{ index + 1 }}</n-button>

    <n-switch v-model:value="isLoop" checked-value="1" unchecked-value="0" />
  </div>
</template>

<script setup lang="ts">
import ScreenRoute from '@/router/modules/screen';
import { RouteRecordRaw } from 'vue-router';
import { useSyncRef } from '@/utils/useSync/useSync';

const router = useRouter();
const route = useRoute();

const routeList = computed(() => {
  return ScreenRoute[0].children as RouteRecordRaw[];
});

const currentRouteIndex = computed(() => {
  return routeList.value.findIndex((item) => item.name === route.name);
});

function jumper(routeRaw: RouteRecordRaw) {
  router.push({
    name: routeRaw.name,
    query: route.query,
  });
}

const routeIndex = useSyncRef(currentRouteIndex.toString(), 'screen');
const routeIndexValue = computed(() => {
  return routeList.value[Number(routeIndex.value)];
});

watch(routeIndex, () => {
  jumper(routeIndexValue.value);
});

// loop
const isDev = computed(() => {
  return import.meta.env.DEV === true ? '0' : '1';
});
const isLoop = useSyncRef(isDev.value, 'loop');
const loopTime = ref(30);
watch(isLoop, (v) => {
  if (v === '1') {
    timer.value = setInterval(jumpToNext, 1000 * loopTime.value);
  } else {
    if (timer.value) {
      clearInterval(timer.value);
    }
  }
});

const timer = ref<NodeJS.Timeout | null>(null);

function jumpToNext() {
  if (isLoop.value === '1') {
    if (currentRouteIndex.value === routeList.value.length - 1) {
      routeIndex.value = '0';
    } else {
      routeIndex.value = (currentRouteIndex.value + 1).toString();
    }
  }
}

onMounted(() => {
  if (isLoop.value === '1') {
    timer.value = setInterval(jumpToNext, 1000 * loopTime.value);
  }
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<style scoped></style>
