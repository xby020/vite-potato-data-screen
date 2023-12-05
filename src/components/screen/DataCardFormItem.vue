<template>
  <n-input-group>
    <n-input v-if="typeof editData === 'string'" v-model:value="editData" />
    <n-input-number class="w-full" v-if="typeof editData === 'number'" v-model:value="editData" />
    <n-button ghost type="success">
      <i-mdi-upload></i-mdi-upload>
    </n-button>
  </n-input-group>
</template>

<script setup lang="ts">
interface Props {
  value?: string | number;
}

const props = defineProps<Props>();

const emits = defineEmits(['update:value']);

const editData = computed({
  get: () => props.value,
  set: (val) => emits('update:value', val),
});
</script>

<style scoped></style>
