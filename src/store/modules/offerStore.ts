import { ProductService } from '@/services/product'
import { IOffer } from '@/types/globals/offers'
import { ActionContext } from 'vuex'

interface OfferState {
  list: IOffer[] | []
}

const state: OfferState = {
  list: [],
}

const getters = {}

const actions = {
  async getAllOffers({ commit }: ActionContext<OfferState, OfferState>) {
    const data = await ProductService.getAll()
    commit('setOffers', data)
  },
}

const mutations = {
  setOffers(state: OfferState, offers: IOffer[]) {
    state.list = offers
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
