import { ElMessageBox } from 'element-plus'

export const beforeRemove = () => {
  return ElMessageBox.confirm('确定要删除该文件吗，该操作是不可逆的。', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'error'
  })
}

export const useOnSuccess = (file: any, response: any) => {
  delete file.response
  delete file.raw
  file.url = 'test'
  file.name = 'test'
  console.log(response)
}
