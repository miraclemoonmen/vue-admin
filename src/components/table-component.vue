
<script lang="ts" setup>
import {
  reactive,
  nextTick,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { isDark } from '@/hooks/isDark'

interface Props {
  url?: string,
  data: {
    list?: any[]
  },
  columns: any[]
}

withDefaults(defineProps<Props>(), {
})
const tableOptions = reactive({
  svg: ` <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`,
  height: 0,
  description: '暂无数据'
})

const computeHeight = () => {
  tableOptions.height = (document.querySelector('.el-table')?.parentNode as HTMLElement)?.clientHeight || 0
}

const initHeight = async () => {
  await nextTick()
  computeHeight()
  window.addEventListener('resize', computeHeight)
}

onMounted(initHeight)
onBeforeUnmount(() => {
  window.removeEventListener('resize', computeHeight)
})

</script>

<template>
  <el-table :data="data?.list" :class="{ 'emptyView': !data?.list }" :height="tableOptions.height"
    :element-loading-svg="tableOptions.svg" element-loading-svg-view-box="-10, -10, 50, 50"
    :element-loading-background="isDark ? 'rgba(30,41,59, 0.9)' : null" v-bind="$attrs">
    <template v-for="(item, index) in columns" :key="item.id || index">
      <el-table-column v-bind="item">
        <template #default="scope">
          <span v-if="!item.slot">{{ scope.row[item.prop] }}</span>
          <slot v-else :name="item.slot" :scope="scope.row"></slot>
        </template>
      </el-table-column>
    </template>
    <template #empty>
      <el-empty :description="tableOptions.description"></el-empty>
    </template>
  </el-table>
</template>
