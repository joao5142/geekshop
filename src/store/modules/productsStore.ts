import { OffersService } from '@/services/offers'
import { ProductService } from '@/services/product'
import { IOffer } from '@/types/globals/offers'
import { IProduct } from '@/types/globals/products'
import { ActionContext } from 'vuex'

interface ProductState {
  list: IProduct[] | []
  offers: IOffer[] | []
}

const state: ProductState = {
  list: [],
  offers: [],
}

const getters = {}

const actions = {
  async getAllProducts({ commit }: ActionContext<ProductState, ProductState>) {
    const data = await ProductService.getAll()
    commit('setProducts', data)
  },

  async getAllOffers({ commit }: ActionContext<ProductState, ProductState>) {
    const data = await OffersService.getAll()
    commit('setOffers', data)
  },
}

const mutations = {
  setProducts(state: ProductState, products: IProduct[]) {
    state.list = products
  },
  setOffers(state: ProductState, offers: IOffer[]) {
    state.offers = offers
  },
  incrementProductInventory(state: ProductState, { productId }: { productId: number }) {
    const product = state.list.find((product) => product.id === productId)

    if (product) {
      product.inventory++
    }
  },

  decrementProductInventory(state: ProductState, { productId }: { productId: number }) {
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
