import httpClient from '@/lib/api'
import { BASE_URL_API } from '@/lib/api'

const state = () => ({
  list: [],
})

const getters = {}

const actions = {
  async getAllProducts({ commit }) {
    const products = await httpClient.get(BASE_URL_API + '/products')
    commit('setProducts', products.data)
  },
}

const mutations = {
  setProducts(state, products) {
    state.list = products
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
