import { reactive } from 'vue'

export const searchFormData = reactive({
  name: '',
  age: '',
  action: '',
  date: ''
})

export const submitFormData = reactive<Record<string, unknown>>({
  name: '',
  path: '',
  icon: '',
  parentNode: '',
  type: 'menu',
  hide: false
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
    prop: 'id'
  },
  {
    label: 'name',
    prop: 'name'
  },
  {
    label: 'gmtCreate',
    prop: 'gmtCreate'
  },
  {
    label: '操作',
    slot: 'action',
    align: 'center'
  }
]
