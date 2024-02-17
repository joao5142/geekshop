import DefaultViewLayout from '@/components/layouts/default/index.vue'
import HomeView from '@/pages/app/home/index.vue'

export default [
  {
    path: '/app',
    component: DefaultViewLayout,
    children: [
      {
        path: 'home',
        component: HomeView,
      },
    ],
  },
]
