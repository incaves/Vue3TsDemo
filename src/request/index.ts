import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
})
// 请求拦截器
service.interceptors.request.use(config => {
  config.headers = config.headers || {}
  // 如果本地有token挂载到请求头上,没有token挂载空字符串
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config
})
// 相应拦截器
service.interceptors.response.use(
  res => {
    // code = 200 为成功
    const code: number = res.data.code
    // 错误的情况下
    if (code != 200) {
      // 返回错误
      return Promise.reject(res.data)
    }
    // 返回数据
    return res.data
  },
  err => {
    console.log(err)
  }
)
export default service
