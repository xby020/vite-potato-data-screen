<template>
  <div class="w-full h-full flex justify-center items-center mr-8">
    <n-dropdown trigger="click" @select="handleSelect" :options="options">
      <!-- Click area -->
      <div class="w-full h-full flex justify-center items-center gap-2 select-none cursor-pointer">
        <!-- Avatar -->
        <n-avatar size="large" :src="info.avatar" round>
          <n-icon size="24" v-if="!info.avatar">
            <i-mdi-account></i-mdi-account>
          </n-icon>
        </n-avatar>

        <!-- Name -->
        <h1 class="tracking-wide">{{ info.username }}</h1>
      </div>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { NIcon } from 'naive-ui';
import { Component } from 'vue';

const userStore = useUserStore();

const { info } = storeToRefs(userStore);

const options = ref([
  {
    label: '注销',
    key: 'logout',
    icon: markRaw(IconMdiLogout),
  },
]);

const router = useRouter();
function handleSelect(key: string) {
  if (key === 'logout') {
    userStore.logout();
    router.push({ name: 'Login' });
  }
}
</script>

<style scoped></style>
