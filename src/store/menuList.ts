import { MutationTree, ActionTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { getRouter } from '@/api'
import { routesMenu } from '@/router/list'

export interface MenuList {
  data: RouteRecordRaw[]
}

const state: MenuList = {
  data: []
}

const mutations: MutationTree<MenuList> = {
  SET_MENULIST (state, list) {
    state.data = list
  }
}

const actions: ActionTree<MenuList, any> = {
  async SET_MENULIST ({ commit }) {
    const data = await getRouter()
    commit('SET_MENULIST', [...routesMenu, ...data])
    return data
  }
}

export default {
  state,
  mutations,
  actions
}
