import axios from 'axios'
import { useAuthStore } from '@/stores/AuthStore'

const BASE_URL = 'http://localhost:3000'
// https://barber-api-e6bffb5bd456.herokuapp.com/

const api = axios.create({
  baseURL: BASE_URL
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
