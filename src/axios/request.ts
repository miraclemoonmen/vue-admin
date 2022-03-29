import axios from 'axios'
import { computed } from 'vue'
import store, { GlobalDataProps } from '@/store'
import { useToast } from 'vue-toastification'
import qs from 'qs'
import { trim } from 'lodash'

const toast = useToast()

const instance = axios.create({
  timeout: 5000
})

const jwt = computed(() => (store.state as unknown as GlobalDataProps).user.token)
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
      Object.keys(params).forEach(key => {
        if (trim(params[key]) === '' || params[key] == null) {
          delete tmp[key]
        }
      })
      return qs.stringify(tmp, { arrayFormat: 'repeat' })
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(response => {
  const data = response.data as Record<string, unknown>
  // if (data.code === 200) {
  return data
  // } else {
  // errorMessage()
  // }
}, err => {
  const response = err.response
  if (response) {
    toast.error(`${response.config.url} is ${response.status} ${response.statusText}`)
  } else {
    toast.error(`${err.config.url} is ${err.message}`)
  }

  return Promise.reject(err)
})

export { instance }
