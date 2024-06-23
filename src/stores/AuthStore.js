import { defineStore } from 'pinia'
import router from '../router'
import api from '../services/api'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: JSON.parse(localStorage.getItem('token')),
    isAuthenticated: !!localStorage.getItem('token'),
    userData: JSON.parse(localStorage.getItem('userData'))
  }),
  actions: {
    async login(username, password) {
      const authentication = await api.post('/auth/login', { username, password })

      localStorage.setItem('token', JSON.stringify(authentication.data.data.token))
      localStorage.setItem('userData', JSON.stringify(authentication.data.data.user))

      this.token = authentication.data.data.token
      this.userData = authentication.data.data.user
      this.isAuthenticated = true

      switch (this.userData.role) {
        case 'CLIENT':
          router.push('/area-do-cliente')
          break
        case 'BARBER':
          router.push('/area-do-barbeiro')
          break
        case 'RECEPT':
          router.push('/area-do-recepcionista')
          break
        case 'MANAGER':
          router.push('/area-do-gerente')
          break
        default:
          router.push('/')
      }
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      this.userData = null
      this.token = null
      this.isAuthenticated = false
      router.push('/login')
    }
  }
})
