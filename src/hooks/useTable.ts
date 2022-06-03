import { ref } from 'vue'
import { instance } from '@/axios/request'

interface IpaginationAndSort {
  currentPage: number,
  pageSize: number,
  prop: string,
  order: string
}

export interface ItableData {
  list: any[],
  total: number
}

export const useInitTable = (url: string, paginationAndSortOptions: IpaginationAndSort) => {
  const tableLoading = ref(true)
  const tableData = ref<ItableData>()
  const getTableData = (query?: object) => {
    tableLoading.value = true
    instance.get(url, {
      params: {
        ...paginationAndSortOptions,
        ...query
      }
    }).then((res: any) => {
      tableData.value = res
      tableLoading.value = false
    })
  }
  const sortChange = ({ prop, order }: IpaginationAndSort) => {
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
