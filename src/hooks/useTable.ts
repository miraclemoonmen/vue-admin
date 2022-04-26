import { ref } from 'vue'
import { instance } from '@/axios/request'

export const useInitTable = (url: string, paginationAndSortOptions: any) => {
  const tableLoading = ref(true)
  const tableData = ref<any>({})
  const getTableData = (query?: any) => {
    tableLoading.value = true
    instance.get(url, {
      params: {
        ...paginationAndSortOptions,
        ...query
      }
    }).then(res => {
      tableData.value = res
      tableLoading.value = false
    })
  }
  const sortChange = ({ prop, order }: any) => {
    paginationAndSortOptions.prop = prop
    paginationAndSortOptions.order = order
    getTableData()
  }
  return {
    tableData,
    tableLoading,
    paginationAndSortOptions,
    sortChange,
    getTableData
  }
}
