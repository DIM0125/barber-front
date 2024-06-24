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
import { useAuthStore } from '@/stores/AuthStore'
import FinanceiroView from '@/views/Gerente/FinanceiroView.vue'
import AgendamentosBarbeiroView from '@/views/Barbeiro/AgendamentosBarbeiroView.vue'
import ServicosBarbeiroView from '@/views/Barbeiro/ServicosBarbeiroView.vue'
import HorariosBarbeiroView from '@/views/Barbeiro/HorariosBarbeiroView.vue'
import UnauthorizedAccessView from '@/views/UnauthorizedAccessView.vue'
import AgendamentosClienteView from '@/views/Cliente/AgendamentosClienteView.vue'
import ServicosGerenteView from '@/views/Gerente/ServicosGerenteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
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
        },
        {
          path: 'agendamentos',
          name: 'cliente-agendamentos',
          component: AgendamentosClienteView
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
        },
        {
          path: 'agendamentos',
          name: 'barbeiro-agendamentos',
          component: AgendamentosBarbeiroView
        },
        {
          path: 'servicos',
          name: 'barbeiro-servicos',
          component: ServicosBarbeiroView
        },
        {
          path: 'horarios',
          name: 'barbeiro-horarios',
          component: HorariosBarbeiroView
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
        },
        {
          path: 'financeiro',
          name: 'gerente-financeiro',
          component: FinanceiroView
        },
        {
          path: 'servicos',
          name: 'gerente-servicos',
          component: ServicosGerenteView
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
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedAccessView
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['index', 'servicos', 'login', 'cadastro']
  const authRequired = !publicPages.includes(to.name)
  let userRole
  if (useAuthStore().isAuthenticated) {
    userRole = useAuthStore().userData.role
  }

  if (to.name === 'login' && useAuthStore().isAuthenticated) {
    return { name: 'index' }
  }

  if (authRequired) {
    if (!useAuthStore().isAuthenticated) {
      return { name: 'login' }
    } else if (to.name.includes('cliente') && userRole !== 'CLIENT') {
      return { name: 'unauthorized' }
    } else if (to.name.includes('gerente') && userRole !== 'MANAGER') {
      return { name: 'unauthorized' }
    } else if (to.name.includes('barbeiro') && userRole !== 'BARBER') {
      return { name: 'unauthorized' }
    } else if (to.name.includes('recepcionista') && userRole !== 'RECEPT') {
      return { name: 'unauthorized' }
    }
  }
})

export default router
