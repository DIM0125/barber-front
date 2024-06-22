import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ServicosView from '@/views/ServicosView.vue'
// import AgendamentoView from '@/views/AgendamentoView.vue'
import CadastroView from '@/views/CadastroView.vue'
import DashboardClienteView from '@/views/Cliente/DashboardClienteView.vue'
import DashboardBarbeiroView from '@/views/Barbeiro/DashboardBarbeiroView.vue'
import DashboardGerenteView from '@/views/Gerente/DashboardGerenteView.vue'
import DashboardRecepcionistaView from '@/views/Recepcionista/DashboardRecepcionistaView.vue'
import PaginaInicialClienteView from '@/views/Cliente/PaginaInicialClienteView.vue'
import PaginaInicialBarbeiroView from '@/views/Barbeiro/PaginaInicialBarbeiroView.vue'
import PaginaInicialGerenteView from '@/views/Gerente/PaginaInicialGerenteView.vue'
import PaginaInicialRecepcionistaView from '@/views/Recepcionista/PaginaInicialRecepcionistaView.vue'
import FuncionariosView from '@/views/Gerente/FuncionariosView.vue'
import EstoqueView from '@/views/Gerente/EstoqueView.vue'

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
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/area-do-cliente',
      name: 'cliente',
      redirect: { name: 'cliente-inicio' },
      component: DashboardClienteView,
      children: [
        {
          path: 'inicio',
          name: 'cliente-inicio',
          component: PaginaInicialClienteView
        }
      ]
    },
    {
      path: '/area-do-barbeiro',
      name: 'barbeiro',
      component: DashboardBarbeiroView,
      redirect: { name: 'barbeiro-inicio' },
      children: [
        {
          path: 'inicio',
          name: 'barbeiro-inicio',
          component: PaginaInicialBarbeiroView
        }
      ]
    },
    {
      path: '/area-do-gerente',
      name: 'gerente',
      component: DashboardGerenteView,
      redirect: { name: 'gerente-inicio' },
      children: [
        {
          path: 'inicio',
          name: 'gerente-inicio',
          component: PaginaInicialGerenteView
        },
        {
          path: 'funcionarios',
          name: 'gerente-funcionarios',
          component: FuncionariosView
        },
        {
          path: 'estoque',
          name: 'gerente-estoque',
          component: EstoqueView
        }
      ]
    },
    {
      path: '/area-do-recepcionista',
      name: 'recepcionista',
      component: DashboardRecepcionistaView,
      redirect: { name: 'recepcionista-inicio' },
      children: [
        {
          path: 'inicio',
          name: 'recepcionista-inicio',
          component: PaginaInicialRecepcionistaView
        }
      ]
    }
  ]
})

export default router
