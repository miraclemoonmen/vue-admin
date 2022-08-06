<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { columns, paginationAndSortOptions, searchFormData, submitFormData } from './options'
import { useInitTable } from '@/hooks/useTable'
import { getTree } from '@/api'
import { useToast } from 'vue-toastification'
import { ElMessageBox } from 'element-plus'
import tableComponent from '@/components/table-component.vue'
import searchFormComponent from './search-form-component.vue'
import submitFormComponent from './submit-form-component.vue'
interface Tree {
  label: string
  children?: Tree[]
}

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

const dataTree = ref([])
const defaultTreeProps = {
  children: 'children',
  label: 'label'
}
const handleNodeClick = (data: Tree) => {
  search()
  console.log(data)
}

const isopen = ref(false)
const changeDrawer = async (type: string, value?: any) => {
  isopen.value = true
  await nextTick()
  Object.keys(submitFormData).forEach(key => {
    submitFormData[key] = value[key]
  })
}

(async () => {
  dataTree.value = (await getTree()).data
  search()
})()
</script>

<template>
  <div class="flex h-full w-full">
    <div class=" w-72 flex-none rounded-lg text-center p-2 bg-white dark:bg-slate-800 dark:text-slate-400">
      <h5 class="text-lg my-2 font-bold">组织机构</h5>
      <el-tree :data="dataTree" :props="defaultTreeProps" @node-click="handleNodeClick" />
    </div>
    <div class="flex flex-col overflow-hidden flex-auto ml-5 p-2 bg-white dark:bg-slate-800 rounded-lg">
      <div class="pt-2">
        <search-form-component @search="search" />
      </div>
      <div class="mb-4 ml-4">
        <el-button icon="Plus" @click="changeDrawer('create')">创建</el-button>
      </div>
      <!-- <div class="flex-auto"> -->
        <table-component :columns="columns" :data="tableData" v-loading="tableLoading" @sort-change="sortChange">
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
