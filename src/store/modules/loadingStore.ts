import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

interface ILoadingState {
  isLoading: boolean
}

const state: ILoadingState = {
  isLoading: false,
}

const getters: GetterTree<ILoadingState, ILoadingState> = {}

const actions: ActionTree<ILoadingState, ILoadingState> = {
  async setIsLoading({ commit }: ActionContext<ILoadingState, ILoadingState>, loading: boolean) {
    commit('setIsLoading', loading)
  },
}

const mutations: MutationTree<ILoadingState> = {
  setIsLoading(state: ILoadingState, loading: boolean) {
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
