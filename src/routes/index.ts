import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes, AuthRoutes } from './modules'

const routes = [{ path: '/', redirect: '/app/home' }, ...AppRoutes, ...AuthRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
export default router
