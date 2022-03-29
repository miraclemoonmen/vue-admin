<template>
  {{ lable }}
  <el-tooltip effect="dark" :content="content" placement="top">
    <el-icon style="cursor :pointer">
      <info-filled />
    </el-icon>
  </el-tooltip>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-undef
defineProps<{
  lable: string,
  content: string
}>()
</script>
