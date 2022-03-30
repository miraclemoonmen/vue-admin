<template>
  <div ref="table" class="table">
    <el-table
      :data="tableState.data?.list"
      :class="{ 'emptyView': !tableState.data?.list }"
      v-loading="tableState.loading"
      :height="tableState.height"
      :element-loading-svg="tableState.svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      highlight-current-row
      v-bind="$attrs"
      @sort-change="sortChange"
    >
      <template v-for="(item, index) in columns" :key="item.id || index">
        <el-table-column v-bind="item">
          <template #default="scope">
            <span v-if="!item.slot">{{ scope.row[item.prop] }}</span>
            <slot v-else :name="item.slot" :scope="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <el-empty :description="tableState.description"></el-empty>
      </template>
    </el-table>
    <el-pagination
      v-if="$attrs.pagination !== false"
      v-model:currentPage="paginationAndSort.currentPage"
      v-model:page-size="paginationAndSort.pageSize"
      :total="tableState.data?.total || 0"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="search"
      @current-change="search"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  nextTick,
  onMounted,
  onActivated,
  onDeactivated
} from 'vue'
import { instance } from '@/axios/request'
// eslint-disable-next-line no-undef
const props = defineProps<{
  url: string,
  columns: any[]
}>()

const tableState = reactive({
  svg: ` <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`,
  data: {} as any,
  height: 0,
  loading: false,
  description: '暂无数据'
})
const computeHeight = () => {
  tableState.height = document.querySelector('.el-table')?.clientHeight || 0
}

const paginationAndSort = reactive({
  currentPage: 1,
  pageSize: 10,
  prop: '',
  order: ''
})

const sortChange = ({ prop, order }: any) => {
  paginationAndSort.prop = prop
  paginationAndSort.order = order
  search()
}

const search = (query?: any) => {
  tableState.loading = true
  instance.get(props.url, {
    params: {
      ...paginationAndSort,
      ...query
    }
  }).then(res => {
    tableState.data = res
    tableState.loading = false
  }).catch(() => {
    tableState.data = []
    tableState.loading = false
    tableState.description = '网络异常'
  })
}

onMounted(() => {
  computeHeight()
  window.addEventListener('resize', computeHeight)
})
onActivated(async () => {
  await nextTick()
  computeHeight()
  window.addEventListener('resize', computeHeight)
})
onDeactivated(() => {
  window.removeEventListener('resize', computeHeight)
})
search()
// eslint-disable-next-line no-undef
defineExpose({
  search
})
</script>

<style lang="scss" scoped>
.table {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-table {
    flex: 1;
  }
  .el-pagination {
    padding-top: 10px;
    padding-left: 10px;
    text-align: end;
  }
}
</style>
