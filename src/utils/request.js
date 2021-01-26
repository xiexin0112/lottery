
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import qs from 'qs'
import { nextTick } from 'vue'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://cc.amazing6.in:8302',
  timeout: 60000, // request timeout
  headers: {
    grant_type: 'client_credentials',
    client: 'code',
    client_id: 'app',
    client_secret: '123456',
    Authorization: 'bearer 06c20772-cdcc-4ab8-8370-7a8f201ba670'
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    const ajaxFlag = store.state.ajaxFlag + 1
    store.commit('AJAX_FLAG', ajaxFlag)
    Toast.loading({
      duration: 0,
      forbidClick: true
    })
    // 让每个请求携带token等 请根据实际情况自行修改
    const data = qs.parse(config.data)
    if (config.method === 'post' || config.method === 'PUT') {
      if (!Array.isArray(config.data) && typeof config.data !== 'string') {
        config.data = {
          ...data
        }
      }
    } else if (config.method === 'get' || config.method === 'patch' || config.method === 'delete' || config.method === 'put') {
      config.params = {
        ...config.params
      }
    }

    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    nextTick(() => {
      const ajaxFlag = store.state.ajaxFlag - 1
      store.commit('AJAX_FLAG', ajaxFlag)
      if (ajaxFlag <= 0) {
        Toast.clear()
      }
    })
    if (response.status === 401) {
      localStorage.clear()
      sessionStorage.clear()
      location.reload()
      // return Promise.reject('未登录')
    }

    const res = response.data
    if (res.code && res.code !== '0000') {
      nextTick(() => {
        res.message && Toast({
          message: res.message,
          duration: 1500
        })
      })
      return Promise.reject(Error)
    } else {
      return res.data || {}
    }
  }, error => {
    nextTick(() => {
      const ajaxFlag = store.state.ajaxFlag - 1
      store.commit('AJAX_FLAG', ajaxFlag)
      if (ajaxFlag <= 0) {
        Toast.clear()
      }
    })
    Toast({
      message: 'network error',
      duration: 1500
    })
    return Promise.reject(error)
  })

export default service
