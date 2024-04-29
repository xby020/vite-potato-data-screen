<template>
  <screen-data-card title="循环列表" v-model:value="data2">
    <div class="w-full h-full p-4">
      <screen-loop-list
        :header="headers"
        header-class="bg-gray-200/20 p-2"
        item-class="bg-dark-400/20 p-2"
        :data="data.data"
        :show-count="5"
        loop-type="waterfall"
        :loop-time="2000"
        :reverse="false"
      ></screen-loop-list>
    </div>
  </screen-data-card>
</template>

<script setup lang="ts">
const headers = computed(() => {
  return [
    {
      header: '事项',
      key: 'name',
      placement: 'left',
      headerStyle: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#C4A1F7',
      },
      width: 2,
    },
    {
      header: '数量',
      key: 'sum',
      width: 2,
    },
  ];
});

const data = ref({
  title: '大厅总体概览',
  key: 's1c1',
  data: [
    {
      name: '80周岁以上老年人高龄津贴申报初审',
      sum: 52127,
    },
    {
      name: '灵活就业人员社会保险补贴受理',
      sum: 32309,
    },
    {
      name: '城乡最低生活保障对象给付',
      sum: 30307,
    },
    {
      name: '综合事务咨询与引导',
      sum: 26779,
    },
    {
      name: '老年人福利补贴',
      sum: 22559,
    },
    {
      name: '个体工商户设立登记',
      sum: 19462,
    },
    {
      name: '《武汉老年人优待证》办理',
      sum: 16461,
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
