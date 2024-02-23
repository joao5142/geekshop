import AppViewDefaultLayout from '@/components/layouts/app/index.vue'

import HomeView from '@/pages/app/home/index.vue'
import PerfilView from '@/pages/app/perfil/index.vue'
import CheckoutView from '@/pages/app/checkout/index.vue'
import OrderView from '@/pages/app/order/[id]/index.vue'
import OfferView from '@/pages/app/offer/[id]/index.vue'
import ProductView from '@/pages/app/product/[id]/index.vue'

export default [
  {
    path: '/app',
    meta: {
      layoutComponent: AppViewDefaultLayout,
    },
    children: [
      {
        path: 'home',
        component: HomeView,
        meta: {
          showFooter: true,
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
      {
        path: 'product/:id',
        component: ProductView,
      },
    ],
  },
]
