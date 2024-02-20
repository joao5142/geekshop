import DefaultViewLayout from '@/components/layouts/default/index.vue'
import BlankViewLayout from '@/components/layouts/blank/index.vue'

import HomeView from '@/pages/app/home/index.vue'
import PerfilView from '@/pages/app/perfil/index.vue'
import CheckoutView from '@/pages/app/checkout/index.vue'
import OrderView from '@/pages/app/order/[id]/index.vue'
import OfferView from '@/pages/app/offer/[id]/index.vue'

export default [
  {
    path: '/app',
    meta: {
      layoutComponent: BlankViewLayout,
    },
    children: [
      {
        path: 'home',
        component: HomeView,
        meta: {
          layoutComponent: DefaultViewLayout,
        },
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

      {
        path: 'offer/:id',
        component: OfferView,
      },
    ],
  },
]
