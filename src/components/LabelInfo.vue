<template>
  {{ lable }}
  <el-tooltip effect="dark" :content="content" placement="top">
    <el-icon style="cursor :pointer">
      <info-filled />
    </el-icon>
  </el-tooltip>
</template>

<script lang="ts" setup>

defineProps<{
  lable: string,
  content: string
}>()
</script>
