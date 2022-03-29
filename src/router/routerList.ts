import type { RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home.vue'

export const routerList: any = {
  Layout: () => import(/* webpackChunkName: "Layout-View" */ '@/views/Layout-View.vue'),
  About: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  Users: () => import(/* webpackChunkName: "users" */ '@/views/Management/Accounts/index.vue'),
  Menu: () => import(/* webpackChunkName: "menu" */ '@/views/Management/Menus/index.vue')
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      name: '首页',
      icon: 'House'
    }
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: () => import(/* webpackChunkName: "authentication" */ '@/views/Authentication/index.vue'),
    meta: {
      isAuthenticated: false,
      hide: true
    }
  }
]

export const notdefined: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  name: '404',
  component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  meta: {
    name: 'not found'
  }
}
