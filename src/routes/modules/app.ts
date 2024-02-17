import DefaultViewLayout from '@/components/layouts/default/index.vue'
import HomeView from '@/pages/app/home/index.vue'
import PerfilView from '@/pages/app/perfil/index.vue'

export default [
  {
    path: '/app',
    component: DefaultViewLayout,
    children: [
      {
        path: 'home',
        component: HomeView,
      },

      {
        path: 'perfil',
        component: PerfilView,
      },
    ],
  },
]
