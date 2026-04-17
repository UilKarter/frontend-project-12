import axios from 'axios'
import { getToken } from '../utils/auth'

const authorization = axios.create()

authorization.interceptors.request.use((config) => {
  const token = getToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default authorization
