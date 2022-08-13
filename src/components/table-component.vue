
<script lang="ts" setup>
import type { ItableData } from '@/hooks/useTable'
import { useUserStore } from '@/stores'
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
defineProps<{
  url?: string,
  data: ItableData | undefined,
  loading: boolean,
  columns: {
    label: string,
    type?: string,
    prop?: string,
    slot?: string,
    width?: number,
    align?: string,
    fixed?: string
  }[]
}>()

const userStore = useUserStore()
const isDark = computed(() => userStore.isDark)
const boxRef = ref()
const height = ref(0)

const resizeTable = () => {
  height.value = 0
  nextTick(() => {
    height.value = boxRef.value.clientHeight
  })
}

onMounted(() => {
  height.value = boxRef.value.clientHeight
  window.addEventListener('resize', resizeTable)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeTable)
})

const tableOptions = {
  svg: ` <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`,
  description: '暂无数据'
}

</script>

<template>
  <div ref="boxRef" class="flex-1 overflow-hidden">
    <el-table v-loading="loading" :data="data?.list" :height="height" :element-loading-svg="tableOptions.svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      :element-loading-background="isDark ? 'rgba(30,41,59, 0.9)' : null" v-bind="$attrs">
      <template v-for="(item, index) in columns" :key="item.id || index">
        <el-table-column v-bind="item">
          <template #default="scope">
            <span v-if="!item.slot && item.prop">{{ scope.row[item.prop] }}</span>
            <slot v-else :name="item.slot" :scope="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <el-empty :description="tableOptions.description"></el-empty>
      </template>
    </el-table>
  </div>
</template>
