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
  <div class="user_manage">
    <div class="user_manage_tree">
      <h5>组织机构</h5>
      <el-tree :data="dataTree" :props="defaultTreeProps" @node-click="handleNodeClick" />
    </div>
    <div class="user_manage_table">
      <div class="user_manage_table_header">
        <search-form-component @search="search" />
      </div>
      <div class="user_manage_table_action">
        <el-button icon="Plus" @click="changeDrawer('create')">创建</el-button>
      </div>
      <div class="user_manage_table_content">
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
      </div>
      <el-pagination class="el-table-pagination" v-model:currentPage="paginationAndSortOptions.currentPage"
        v-model:page-size="paginationAndSortOptions.pageSize" :total="tableData?.total || 0"
        :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" @size-change="getTableData"
        @current-change="getTableData" />
    </div>
    <submit-form-component v-model:isopen="isopen" @search="search" />
  </div>
</template>

<style lang="scss" scoped>
.user_manage {
  display: flex;
  height: 100%;

  &_tree {
    padding: 10px;
    display: flex;
    flex-direction: column;
    @include whiteContent;
    flex: 0 0 13%;
    text-align: center;
  }

  &_table {
    margin-left: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    @include whiteContent;

    &_header {
      padding-top: 10px;
    }

    &_action {
      margin: 0px 0px 18px 15px;
    }

    &_content {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
