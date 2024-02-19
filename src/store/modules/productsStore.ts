import { ProductService } from '@/services/product'
import { ActionContext } from 'vuex'

export interface Product {
  id: number
  title: string
  price: number
  inventory: number
}

interface ProductState {
  list: Product[] | []
}

const state: ProductState = {
  list: [],
}

const getters = {}

const actions = {
  async getAllProducts({ commit }: ActionContext<ProductState, ProductState>) {
    const data = await ProductService.getAll()
    commit('setProducts', data)
  },
}

const mutations = {
  setProducts(state: ProductState, products: Product[]) {
    state.list = products
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
