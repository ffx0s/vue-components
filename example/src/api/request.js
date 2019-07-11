import axios from 'axios'
// import store from '@/store'
import Modal from 'vue-components/modal/plugin'

// create an axios instance
const request = axios.create({
  // withCredentials: true,
  // timeout: 10000, // request timeout
  baseURL: 'https://api.webfed.cn/mock/15' // api的base_url
})

// request interceptor
request.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
request.interceptors.response.use(
  response => {
    const result = response.data

    if (response.status !== 200 || result.error) {
      Modal(result.message || '服务出错，请稍后再试')
      return Promise.reject('error')
    }

    return result
  },
  error => {
    console.log(error) // for debug
    Modal(error.message)
    return Promise.reject(error)
  }
)

export default request
