import AuthViewLayout from '@/components/layouts/auth/index.vue'
import LoginView from '@/pages/auth/login/index.vue'

export default [
  {
    path: '/auth',
    component: AuthViewLayout,
    children: [
      {
        path: 'login',
        component: LoginView,
      },
    ],
  },
]
