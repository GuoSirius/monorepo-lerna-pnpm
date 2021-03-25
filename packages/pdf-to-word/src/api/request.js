import axios from 'axios'

const BASE_URL = 'http://156.251.165.179:8080'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 0 // 10000
  // withCredentials: false
})

request.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default request
