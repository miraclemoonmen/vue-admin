import { MutationTree, ActionTree } from 'vuex'
import router from '../router'

export interface Tabs {
  data: any[],
  active: string
}

const state: Tabs = {
  data: [],
  active: ''
}

const mutations: MutationTree<Tabs> = {
  SET_TABS (state, data) {
    state.data = data
  },
  ADD_TABS (state, { name, url }) {
    state.active = url
    if (state.data.some(item => item.url === url)) return true
    state.data.push({
      name,
      url
    })
  },
  DEL_TABS (state, targetName) {
    if (state.data.length === 1) return true
    if (state.active === targetName) {
      state.data.forEach((item, index: number) => {
        if (item.url === targetName) {
          const nextTab = state.data[index + 1] || state.data[index - 1]
          if (nextTab) {
            state.active = nextTab.url
            router.push(nextTab.url)
          }
        }
      })
    }
    state.data = state.data.filter((item) => item.url !== targetName)
  },
  SET_ACTIVE (state, data) {
    state.active = data
  }
}

const actions: ActionTree<Tabs, any> = {
  SET_TABS ({ commit }, data) {
    commit('SET_MENULIST', data)
  },
  ADD_TABS ({ commit }, data: { name: string, url: string }) {
    commit('ADD_TABS', data)
  },
  DEL_TABS ({ commit }, url) {
    commit('DEL_TABS', url)
  },
  SET_ACTIVE ({ commit }, url) {
    commit('SET_ACTIVE', url)
  }
}

export default {
  state,
  mutations,
  actions
}
