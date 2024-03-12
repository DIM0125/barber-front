import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ServicosView from '@/views/ServicosView.vue'
import AgendamentoView from '@/views/AgendamentoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeView
    },
    {
      path: '/servicos',
      name: 'servicos',
      component: ServicosView
    },
    {
      path: '/agendamento',
      name: 'agendamento',
      component: AgendamentoView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
