<template>
  <div class="user_manage">
    <div class="user_manage_tree">
      <h5>组织机构</h5>
      <el-tree :data="dataTree" :props="defaultTreeProps" @node-click="handleNodeClick" />
    </div>
    <div class="user_manage_table">
      <div class="user_manage_table_header">
        <Form inline :formOptions="formSearch" ref="form" label-width="auto" />
        <div class="user_manage_table_action">
          <el-button type="primary" icon="Search" @click="search">搜索</el-button>
          <el-button icon="Refresh" @click="restFrom">重置</el-button>
          <el-button icon="Plus" @click="changeDrawer('create')">创建</el-button>
        </div>
      </div>
      <div class="user_manage_table_content">
        <Table ref="table" :columns="columns" action url="/mock/getList">
          <template #state="{ scope }">
            <el-switch v-model="scope.state" disabled />
          </template>
          <template #action="{ scope }">
            <el-button-group>
              <el-button icon="Edit" circle @click="changeDrawer('retrieve', scope)" />
              <el-button type="danger" icon="Delete" circle @click="delData(scope)" />
            </el-button-group>
          </template>
        </Table>
      </div>
    </div>
    <el-drawer size="20%" :before-close="handleClose" v-model="isopen" destroy-on-close>
      <Form :formOptions="formOptions" label-position="top" :data="formData" />
      <template #footer>
        <el-button @click="isopen = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Table from '@/components/Table.vue'
import Form from '@/components/Form.vue'
import { useToast } from 'vue-toastification'
import { getTree } from '@/api'
import { ElMessageBox } from 'element-plus'
interface Tree {
  label: string
  children?: Tree[]
}
const toast = useToast()

const table = ref()
const columns = [
  {
    label: 'ID',
    prop: 'age'
  },
  {
    label: '姓名',
    prop: 'name'
  },
  {
    label: '状态',
    prop: 'state',
    slot: 'state'
  },
  {
    label: '创建时间',
    prop: 'gmtCreate'
  }
]
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

const form = ref()
const formSearch = reactive([
  {
    type: 'input',
    lable: '姓名',
    prop: 'password',
    value: ''
  },
  {
    type: 'input',
    lable: '年龄',
    prop: 'asd',
    value: ''
  },
  {
    type: 'select',
    lable: '状态',
    prop: 'region',
    value: '',
    options: [
      {
        value: 'Option1',
        label: '正常',
        type: 'option'
      },
      {
        value: 'Option2',
        label: '停用',
        type: 'option'
      }
    ]
  },
  {
    type: 'date-picker',
    lable: '创建时间',
    prop: 'time',
    value: [],
    attrs: {
      type: 'date',
      'value-format': 'YYYY-MM-DD'
    }
  }
])
const search = () => {
  form.value.submitForm((data: any) => {
    table.value.search(data)
  })
}
const restFrom = () => {
  form.value && form.value.resetForm()
}

const options: any = ref([])
const formOptions = reactive([
  {
    type: 'input',
    lable: '姓名',
    prop: 'name',
    value: ''
  },
  {
    type: 'input',
    lable: '密码',
    prop: 'age',
    value: '',
    attrs: {
      type: 'password',
      'show-password': true
    }
  },
  {
    type: 'switch',
    lable: '状态',
    prop: 'state',
    value: true
  },
  {
    type: 'date-picker',
    lable: '创建时间',
    prop: 'gmtCreate',
    value: [],
    attrs: {
      type: 'datetime'
    }
  },
  {
    type: 'cascader',
    lable: '菜单权限',
    prop: 'cascader',
    value: null,
    attrs: {
      options,
      props: {
        multiple: true,
        emitPath: false
      }
    }
  }
])
const submitForm = () => {
  form.value.submitForm(
    (val: Record<string, never>) => {
      console.log(val)
      toast.success('提交成功')
      isopen.value = false
      search()
    },
    () => {
      console.log('失败')
    }
  )
}

const dataTree = ref([])
const defaultTreeProps = {
  children: 'children',
  label: 'label'
}
const handleNodeClick = (data: Tree) => {
  table.value.search()
  console.log(data)
}

const formData = ref()
const isopen = ref(false)
const changeDrawer = (type: string, value?: any) => {
  switch (type) {
    case 'retrieve':
      setTimeout(() => {
        formData.value = value
      })
      break
    default:
      break
  }
  setTimeout(() => {
    options.value = [
      {
        value: '首页1',
        label: '首页'
      },
      {
        value: '关于1',
        label: '关于'
      },
      {
        value: '系统管理1',
        label: '系统管理',
        children: [{
          value: '用户管理1',
          label: '用户管理'
        }, {
          value: '权限管理',
          label: '权限管理'
        }]
      }
    ]
  })
  formData.value = []
  isopen.value = true
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

(async () => {
  dataTree.value = (await getTree()).data
})()
</script>

<style lang="scss" scoped>
.user_manage {
  display: flex;
  height: 100%;
  &_tree {
    padding: 10px;
    @include whiteContent;
    flex: 0 0 13%;
    text-align: center;
  }
  &_table {
    overflow: hidden;
    margin-left: 20px;
    padding: 10px;
    @include whiteContent;
    flex-direction: column;
    &_header {
      padding: 10px 0px;
    }
    &_action {
      margin-left: 15px;
    }
    &_content {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
