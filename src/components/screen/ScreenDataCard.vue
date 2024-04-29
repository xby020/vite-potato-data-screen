<template>
  <div class="w-full h-full flex flex-col bg-blue/20">
    <!-- Title -->
    <div class="relative w-full flex">
      <div class="text-2xl font-pm text-gradient-blue">
        <span class="select-none cursor-pointer" @click="editShow = true">{{ title }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="w-full flex-auto">
      <slot name="default"></slot>
    </div>

    <!-- Modal -->
    <n-modal v-model:show="editShow" preset="card" class="w-2/3 min-h-1/2" title="数据编辑">
      <div class="w-full h-full flex flex-col">
        <!-- title -->
        <n-h3 prefix="primary">
          <n-text>{{ `${title}` }}</n-text>
        </n-h3>

        <!-- Editor -->
        <n-scrollbar class="w-full min-h-360px">
          <div v-for="(tab, tabIndex) in editFormData" :key="tabIndex" class="w-full flex flex-col">
            <n-h4>
              <n-text>{{ editTableList[tabIndex] }}</n-text>
            </n-h4>

            <n-data-table :columns="editFormHeader" :data="tab" />
          </div>
        </n-scrollbar>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="w-full flex justify-between">
          <!-- Info -->
          <div class="flex-auto h-full">
            <n-ellipsis>
              <n-text class="text-sm text-amber-300">{{ info }}</n-text>
            </n-ellipsis>
          </div>

          <!-- Action -->
          <div class="flex gap-4">
            <n-button type="default" @click="editShow = false">取消</n-button>
            <n-button type="success" :loading="editLoading" @click="handleEditSave">保存</n-button>
          </div>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { DataCardData } from '@root/src/types/dataCard';
import DataCardFormItem from './DataCardFormItem.vue';

interface Props {
  title?: string;
  value?: Record<string, DataCardData> | DataCardData;
}

const props = defineProps<Props>();

// Edit
const editShow = ref(false);
const info = ref('');

const emits = defineEmits(['update:value']);

const editData = computed({
  get: () => props.value,
  set: (val) => emits('update:value', val),
});

const editLoading = ref(false);

// handle edit save
async function handleEditSave() {
  console.log(editData.value);
}

// handle date update
async function getSavedData() {}

// edit form
const editDataLevel = computed(() => {
  let level = 0;
  if (editData.value) {
    if (Array.isArray(editData.value.data)) {
      level = 1;
    } else {
      level = 2;
    }
  }

  return level;
});

const editTableList = computed(() => {
  if (editDataLevel.value === 2) {
    return Object.keys(editData.value?.data as Record<string, any>);
  } else {
    return [];
  }
});

const editFormHeader = computed(() => {
  if (props.value) {
    let headers: string[] = [];
    if (editDataLevel.value === 1) {
      const singleData = (editData.value?.data as Array<Record<string, any>>)[0];
      headers = Object.keys(singleData);
    }
    if (editDataLevel.value === 2) {
      const sampleData = (props.value as Record<string, any>)[Object.keys(props.value)[0]];
      headers = Object.keys(sampleData);
    }

    return headers.map((header) => {
      return {
        title: header,
        key: header,
        render(row: any) {
          return h(DataCardFormItem, {
            value: row[header],
            'onUpdate:value': (val: string) => {
              row[header] = val;
            },
          });
        },
      };
    });
  }
});

const editFormData = computed(() => {
  if (editDataLevel.value === 1) {
    return [props.value?.data];
  }
  if (editDataLevel.value === 2) {
    return Object.values(props.value?.data as Record<string, any>);
  }
});
</script>

<style scoped></style>
