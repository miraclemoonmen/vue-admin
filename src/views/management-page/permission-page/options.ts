import { reactive } from 'vue'

export const searchFormData = reactive({
  name: '',
  age: '',
  action: '',
  date: ''
})

export const submitFormData = reactive<Record<string, unknown>>({
  name: '',
  age: '',
  action: '',
  permissionList: ''
})

export const paginationAndSortOptions = reactive({
  currentPage: 1,
  pageSize: 10,
  prop: '',
  order: ''
})

export const columns = [
  {
    label: 'ID',
    prop: 'age',
    sortable: 'custom'
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
    prop: 'gmtCreate',
    sortable: 'custom'
  },
  {
    label: '操作',
    slot: 'action',
    align: 'center'
  }
]
