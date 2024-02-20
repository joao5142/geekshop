import { OffersService } from '@/services/offers'
import { ProductService } from '@/services/product'
import { IOffer } from '@/types/globals/offers'
import { IProduct } from '@/types/globals/products'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

interface IProductState {
  list: IProduct[] | []
  offers: IOffer[] | []
}

const state: IProductState = {
  list: [],
  offers: [],
}

const getters: GetterTree<IProductState, IProductState> = {}

const actions: ActionTree<IProductState, IProductState> = {
  async getAllProducts({ commit }: ActionContext<IProductState, IProductState>) {
    const data = await ProductService.getAll()
    commit('setProducts', data)
  },

  async getAllOffers({ commit }: ActionContext<IProductState, IProductState>) {
    const data = await OffersService.getAll()
    commit('setOffers', data)
  },
}

const mutations: MutationTree<IProductState> = {
  setProducts(state: IProductState, products: IProduct[]) {
    state.list = products
  },
  setOffers(state: IProductState, offers: IOffer[]) {
    state.offers = offers
  },
  incrementProductInventory(state: IProductState, { productId }: { productId: number }) {
    const product = state.list.find((product) => product.id === productId)

    if (product) {
      product.inventory++
    }
  },

  decrementProductInventory(state: IProductState, { productId }: { productId: number }) {
    const product = state.list.find((product) => product.id === productId)

    if (product && product.inventory >= 1) {
      product.inventory--
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
