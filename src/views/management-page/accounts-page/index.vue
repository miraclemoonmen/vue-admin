<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { columns, paginationAndSortOptions, searchFormData, submitFormData } from './options'
import { useInitTable } from '@/hooks/useTable'
import { useToast } from 'vue-toastification'
import { ElMessageBox } from 'element-plus'
import tableComponent from '@/components/table-component.vue'
import searchFormComponent from './search-form-component.vue'
import submitFormComponent from './submit-form-component.vue'

const toast = useToast()
const { tableData, tableLoading, sortChange, getTableData } = useInitTable('https://www.fastmock.site/mock/9610740db4aff3d4fa9b3f816a2ced43/mock/getList', paginationAndSortOptions)
const search = () => {
  getTableData(searchFormData)
}

const delData = (row: any) => {
  ElMessageBox.confirm('确定要删除该数据吗，该操作是不可逆的。', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'error'
  }).then(() => {
    console.log(row)
    search()
    toast.error('删除成功')
  }).catch(() => {
    return true
  })
}

const isopen = ref(false)
const changeDrawer = async (type: string, value?: any) => {
  isopen.value = true
  await nextTick()
  Object.keys(submitFormData).forEach(key => {
    submitFormData[key] = value[key]
  })
}

search()
</script>

<template>
  <div class="flex h-full w-full overflow-hidden">
    <div class="flex flex-col flex-auto p-2 overflow-hidden bg-white dark:bg-slate-800 rounded-lg">
      <div class="pt-2">
        <search-form-component @search="search" />
      </div>
      <div class="mb-4 ml-4">
        <el-button icon="Plus" @click="changeDrawer('create')">创建</el-button>
      </div>
      <!-- <div class="flex-1 overflow-hidden"> -->
        <table-component :columns="columns" :data="tableData" :loading="tableLoading" @sort-change="sortChange">
          <template #state="{ scope }">
            <el-switch v-model="scope.state" disabled />
          </template>
          <template #action="{ scope }">
            <el-button-group>
              <el-button icon="Edit" circle @click="changeDrawer('retrieve', scope)" />
              <el-button type="danger" icon="Delete" circle @click="delData(scope)" />
            </el-button-group>
          </template>
        </table-component>
      <!-- </div> -->
      <el-pagination class="el-table-pagination" v-model:currentPage="paginationAndSortOptions.currentPage"
        v-model:page-size="paginationAndSortOptions.pageSize" :total="tableData?.total || 0"
        :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" @size-change="getTableData"
        @current-change="getTableData" />
    </div>
    <submit-form-component v-model:isopen="isopen" @search="search" />
  </div>
</template>
