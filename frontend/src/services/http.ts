import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { useNotificationStore } from '@/stores/notifications'
import axios from 'axios'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

const baseURL = 'http://localhost:3000'
export const baseURLImage = `${baseURL}/images`

const instance = axios.create({
  baseURL: baseURL
})

let loadAnimate

nextTick(() => {
  loadAnimate = useLoadingStore()
})

instance.interceptors.request.use(
  async (config) => {
    loadAnimate = useLoadingStore()
    loadAnimate.doLoading()
    await new Promise((resolve) => {
      setTimeout(resolve, 700)
    })
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  async (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  async function (res) {
    loadAnimate = useLoadingStore()
    loadAnimate.doneLoading()
    return res
  },
  async function (err) {
    loadAnimate = useLoadingStore()
    loadAnimate.doneLoading()
    const originalConfig = err.config

    if (originalConfig.url !== '/auth/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          useAuthStore().logout(true)
          return instance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }
    if (err.code === 'ERR_NETWORK') {
      try {
        useNotificationStore().addPopText('No network connection')
        useRouter().replace('/login')
        return Promise.reject(err)
      } catch {
        throw Error
      }
    }

    return Promise.reject(err)
  }
)

export default instance
