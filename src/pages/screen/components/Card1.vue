<template>
  <screen-data-card title="窗口办件" v-model:value="data2"> </screen-data-card>
</template>

<script setup lang="ts">
const data = ref({
  title: '大厅总体概览',
  key: 's1c1',
  data: [
    {
      title: '入驻单位',
      value: 34,
      unit: '个',
    },
    {
      title: '入驻事项',
      value: 1928,
      unit: '件',
    },
    {
      title: '开放率',
      value: 59.23,
      unit: '%',
    },
  ],
});

const data2 = ref({
  title: '窗口办件',
  key: 's1c1',
  data: [
    {
      name: '张三',
      count: 123,
      avatar: '/meida/1.jpg',
    },
    {
      name: '李四',
      count: 4412,
      avatar: '/meida/2.jpg',
    },
    {
      name: '王五',
      count: 111255,
      avatar: '/meida/3.jpg',
    },
  ],
});
</script>

<style scoped></style>
