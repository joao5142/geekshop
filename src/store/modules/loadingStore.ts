import { ActionContext } from 'vuex'

interface LoadingState {
  isLoading: boolean
}

const state: LoadingState = {
  isLoading: false,
}

const getters = {}

const actions = {
  async setIsLoading({ commit }: ActionContext<LoadingState, LoadingState>, loading: boolean) {
    commit('setIsLoading', loading)
  },
}

const mutations = {
  setIsLoading(state: LoadingState, loading: boolean) {
    state.isLoading = loading
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
