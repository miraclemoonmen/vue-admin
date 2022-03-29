import { MutationTree, ActionTree } from 'vuex'
import { login } from '@/api/index'

export interface User {
  token: string | null,
  keepPassword: boolean,
}

const state: User = {
  token: window.localStorage.getItem('token'),
  keepPassword: true
}

const mutations: MutationTree<User> = {
  SET_TOKEN (state, token) {
    state.token = token
    if (!state.keepPassword) return
    window.localStorage.setItem('token', token)
  },
  CLEAR_TOKEN () {
    window.localStorage.removeItem('token')
  },
  SET_KEEPASSWORD (state) {
    state.keepPassword = !state.keepPassword
  }
}

const actions: ActionTree<User, any> = {
  async SET_TOKEN ({ commit }) {
    const { token } = await login()
    commit('SET_TOKEN', token)
  },
  CLEAR_TOKEN ({ commit }) {
    commit('CLEAR_TOKEN')
  },
  SET_KEEPASSWORD ({ commit }) {
    commit('SET_KEEPASSWORD')
  }
}

export default {
  state,
  mutations,
  actions
}
