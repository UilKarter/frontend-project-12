import axios from 'axios'

const authorization = axios.create()

authorization.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default authorization
