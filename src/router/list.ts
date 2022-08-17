import type { RouteRecordRaw } from 'vue-router'

import LayoutViewAdmin from '@/views/admin-layout-page.vue'

export interface routerList {
  path: string,
  name: string,
  filepath: string,
  redirect: string,
  meta: {
    icon: string,
    hide?: boolean,
  },
  children?: routerList[]
}

export const routesMenu: RouteRecordRaw[] = [
  {
    path: '/',
    name: '首页',
    component: () => import(/* webpackChunkName: "home-page" */ '@/views/home-page/index.vue'),
    meta: {
      icon: 'House'
    }
  }
]

export const routes: RouteRecordRaw[] = [
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
  component: () => import(/* webpackChunkName: "404-page" */ '@/views/404-page.vue')
}
