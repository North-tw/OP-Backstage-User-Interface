import axios from 'axios'
import { useAppStore } from '@/stores/index'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { useUser } from '@/helpers/useUser.js'

const api = axios.create({
  baseURL: process.env.VUE_APP_API
})
const apiWithoutLoading = axios.create({
  baseURL: process.env.VUE_APP_API
})

const requestSuccessHandler = (request) => {
  if (request.url === '/api_valid/admin/kaptcha') {
    request.responseType = 'arraybuffer'
  }

    // 取得 pinia store
  const userStore = useUserStore()

  request.headers.Authorization = 'Bearer ' + (userStore.getToken || '')
  
  request.withCredentials = true
  return request
}

const requestFailedHandler = (error) => {
  return Promise.reject(error)
}

api.interceptors.request.use(
  request => {
    const appStore = useAppStore()
    appStore.setIsLoading(true)
    return requestSuccessHandler(request)
  },
  error => {
    return requestFailedHandler(error)
  }
)

const { logout } = useUser()

api.interceptors.response.use(
  response => {
    const appStore = useAppStore()
    appStore.setIsLoading(false)
    return response
  },
  error => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    appStore.setIsLoading(false)
    if (error?.response?.data?.errMsg === '403-3:拒絕存取授權，API Token已失效。') {
      userStore.token = null
      router.push('/login')
      appStore.setAlert({ show: true, success: false, text: 'Access expired, login in again plz.' })
    } else {
      // 系統維護
      // router.push('/system-maintenance')      
      appStore.setAlert({ show: true, success: false, text: 'System under construction, try it later.' })
    }   
    setTimeout(() => {
      appStore.setAlert({ show: false })
    }, 1500)

    return Promise.reject(error)
  }
)

apiWithoutLoading.interceptors.request.use(
  request => {
    return requestSuccessHandler(request)
  },
  error => {
    return requestFailedHandler(error)
  }
)

apiWithoutLoading.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

const useAPI = ({ method, path, data }) => api[method](`${path}`, data)
const useValidateAPI = ({ method, path, data }) => api[method](`/api/v1/members${path}`, data)
const useUserAPI = ({ method, path, data }) => api[method](`/api/v1/members${path}`, data)
const useCommonAPI = ({ method, path, data }) => api[method](`/api/v1${path}`, data)
const useTableAPI = ({ method, path, data }) => api[method](`/api/v1${path}`, data)
const useQueryAPI = ({ method, path, data }) => api[method](`/api/v1/${path}`, data)
const useGlobalAPI = ({ method, path, data }) => api[method](`/api/v1${path}`, data)
const useLogAPI = ({ method, path, data }) => api[method](`/api/v1/logs/${path}`, data)

export {
  useAPI,
  useValidateAPI,
  useUserAPI,
  useCommonAPI,
  useTableAPI,
  useQueryAPI,
  useGlobalAPI,
  useLogAPI
}
