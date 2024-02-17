import DefaultViewLayout from '@/components/layouts/default/index.vue'
import LoginView from '@/pages/auth/login/index.vue'

export default [
  {
    path: '/auth',
    component: DefaultViewLayout,
    children: [
      {
        path: 'login',
        component: LoginView,
      },
    ],
  },
]
