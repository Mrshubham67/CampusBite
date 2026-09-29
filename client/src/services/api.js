import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const tokenKey = 'campusbite_token'

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem(tokenKey)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.sessionStorage.getItem(tokenKey)) {
      window.sessionStorage.removeItem(tokenKey)
      window.dispatchEvent(new Event('campusbite:session-expired'))
    }
    return Promise.reject(error)
  },
)

export default api