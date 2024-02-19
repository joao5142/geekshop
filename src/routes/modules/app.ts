import DefaultViewLayout from '@/components/layouts/default/index.vue'
import HomeView from '@/pages/app/home/index.vue'
import PerfilView from '@/pages/app/perfil/index.vue'
import CheckoutView from '@/pages/app/checkout/index.vue'
import OrderView from '@/pages/app/order/[id]/index.vue'

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
        path: 'checkout',
        component: CheckoutView,
      },

      {
        path: 'perfil',
        component: PerfilView,
      },

      {
        path: 'order/:id',
        component: OrderView,
      },
    ],
  },
]
