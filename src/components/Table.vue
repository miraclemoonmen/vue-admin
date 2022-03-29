<template>
  <div ref="table" class="table">
    <el-table
      :data="tableData?.list"
      :class="{ 'emptyView': !tableData?.list }"
      v-loading="tableState.loading"
      :height="tableHeight"
      :element-loading-svg="svg"
      class="custom-loading-svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      highlight-current-row
      v-bind="$attrs"
      @sort-change="sortChange"
    >
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column
          sortable="custom"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :prop="item.prop"
        >
          <template #default="scope">
            <span v-if="!item.slot">{{ scope.row[item.prop] }}</span>
            <slot v-else :name="item.slot" :scope="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        label="操作"
        :width="$attrs.actionWidth"
        v-if="$attrs.action === ''"
        :align="`center`"
        fixed="right"
      >
        <template #default="scope">
          <slot name="action" :scope="scope.row"></slot>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :description="tableState.description"></el-empty>
      </template>
    </el-table>
    <el-pagination
      v-model:currentPage="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      :total="tableData?.total ? tableData.total : 0"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="search"
      @current-change="search"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  nextTick,
  onMounted,
  onActivated,
  onDeactivated
} from 'vue'
import { instance } from '@/axios/request'
const svg = ` <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`
// eslint-disable-next-line no-undef
const props = defineProps<{
  url: string,
  columns: any[]
}>()
const tableData = ref()
const tableHeight = ref()
const columnEdit = ref()
const tableState = reactive({
  loading: false,
  description: '暂无数据'
})
const computeHeight = () => {
  tableHeight.value = document.querySelector('.el-table')?.clientHeight
}
const sort = reactive({
  prop: '',
  order: ''
})
const pagination = reactive({
  currentPage: 1,
  pageSize: 10
})
const sortChange = ({ prop, order }: any) => {
  sort.prop = prop
  sort.order = order
  search()
}
const search = (query?: any) => {
  tableState.loading = true
  columnEdit.value = ''
  instance
    .get(props.url, {
      params: {
        ...pagination,
        ...sort,
        ...query
      }
    })
    .then(res => {
      tableData.value = res
      tableState.loading = false
    })
    .catch(() => {
      tableData.value = []
      tableState.loading = false
      tableState.description = '网络异常'
    })
}

onMounted(() => {
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
  .el-icon {
    padding-left: 5px;
    font-size: 15px;
    svg {
      @include hoverHand;
    }
  }
  .el-pagination {
    padding-top: 10px;
    padding-left: 10px;
    text-align: end;
  }
}
</style>
