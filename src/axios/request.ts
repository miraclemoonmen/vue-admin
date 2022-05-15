import axios from 'axios'
import { computed } from 'vue'
import store, { GlobalDataProps } from '@/store'
import { useToast } from 'vue-toastification'
import qs from 'qs'
import { trim } from 'lodash'

const toast = useToast()
const jwt = computed(() => (store.state as unknown as GlobalDataProps).user.token)

export const instance = axios.create({
  timeout: 5000
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  // withCredentials: true
})

instance.interceptors.request.use(config => {
  if (jwt.value) {
    config.headers = {
      // ContentType: 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${jwt.value}`
    }
  }
  if (config.method === 'get') {
    config.paramsSerializer = params => {
      const tmp = { ...params }
      Reflect.ownKeys(params).forEach(key => {
        if (trim(params[key]).length === 0) {
          delete tmp[key]
        }
      })
      return qs.stringify(tmp, { arrayFormat: 'repeat' })
    }
  }
  return config
}, err => Promise.reject(err))

instance.interceptors.response.use(response => {
  const data = response.data as Record<string, any>
  const status = response.status
  switch (status) {
    case 200:
      return data
    case 401:
      // store.dispatch('CLEAR_TOKEN')
      break
    default:
      toast.error(`${status}`)
      break
  }
}, err => {
  const response = err.response
  if (response) {
    toast.error(`${response.config.url} is ${response.status} ${response.statusText}`)
  } else {
    toast.error(`${err.config.url} is ${err.message}`)
  }
  return Promise.reject(err)
})
