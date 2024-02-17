import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes } from './modules'

const routes = [...AppRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
export default router
