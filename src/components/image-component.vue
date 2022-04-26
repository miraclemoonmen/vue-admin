<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = defineProps<{
  src: string
  srcList?: any[]
}>()
const loading = ref(true)
watch(
  () => props.src,
  () => {
    loading.value = false
  }
)
</script>

<template>
  <div class="fill">
    <el-skeleton class="fill" :loading="loading" animated>
      <template #template>
        <el-skeleton-item class="fill" variant="image" />
      </template>
      <el-image class="fill" :src="src" :preview-src-list="srcList" hide-on-click-modal lazy>
        <template #error>
          <div class="image-slot">
            <el-icon>
              <Picture />
            </el-icon>
          </div>
        </template>
      </el-image>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped>
.fill {
  width: 100%;
  height: 100%;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  @extend .fill;
  color: var(--el-text-color-secondary);
  background-color: #f5f7fa;
  .el-icon {
    font-size: 40px;
  }
}
</style>
