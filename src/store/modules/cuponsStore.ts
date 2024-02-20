import { ProductService } from '@/services/product'
import { IOffer } from '@/types/globals/offers'
import { ActionContext } from 'vuex'

interface CuponsState {
  list: IOffer[] | []
}

const state: CuponsState = {
  list: [],
}

const getters = {}

const actions = {
  async getAllCupons({ commit }: ActionContext<CuponsState, CuponsState>) {
    const data = await ProductService.getAll()
    commit('setCuppons', data)
  },
}

const mutations = {
  setCupons(state: CuponsState, cupons: IOffer[]) {
    state.list = cupons
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
