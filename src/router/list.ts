import type { RouteRecordRaw } from 'vue-router'

import HomePage from '@/views/home-page/index.vue'
import LayoutViewAdmin from '@/views/admin-layout-page.vue'
import LayoutPage from '@/views/layout-page.vue'

export const routerList: any = {
  LayoutPage,
  AboutPage: () => import(/* webpackChunkName: "about-page" */ '@/views/about-page.vue'),
  AccountsPage: () => import(/* webpackChunkName: "accounts-page/" */ '@/views/management-page/accounts-page/index.vue'),
  MenuPage: () => import(/* webpackChunkName: "menus-page" */ '@/views/management-page/menus-page/index.vue')
}

export const routesMenu: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      name: '首页',
      icon: 'House'
    }
  }
]

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LayoutViewAdmin',
    component: LayoutViewAdmin,
    children: routesMenu
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import(/* webpackChunkName: "authentication-page" */ '@/views/authentication-page/index.vue'),
    meta: {
      isAuthenticated: false
    }
  }
]

export const notdefined: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  name: '404',
  component: () => import(/* webpackChunkName: "404-page" */ '@/views/404-page.vue'),
  meta: {
    name: 'not found'
  }
}
