import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './list'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
