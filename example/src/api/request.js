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
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
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
