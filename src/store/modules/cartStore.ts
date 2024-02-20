import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'
import { IProduct } from '@/types/globals/products'
import {
  IAddressData,
  ICartItem,
  IOrderData,
  IPaymentData,
  IUserData,
} from '@/types/globals/checkout'

interface ICartState {
  items: ICartItem[]
  order: {
    id: string | number | null
    userInfo: IUserData | null
    address: IAddressData | null
    payment: IPaymentData
    products: ICartItem[] | []
    total: number
    subtotal?: number
  }

  checkoutStatus: string | null
}

const state: ICartState = {
  items: [],
  order: {
    id: '',
    userInfo: null,
    payment: { type: null, card: null },
    address: null,
    products: [],
    total: 0,
  },

  checkoutStatus: null,
}

const getters: GetterTree<ICartState, ICartState> = {
  cartSubtotalPrice: (state: ICartState) => {
    return state.items.reduce((total: number, product: ICartItem) => {
      return total + product.price * product.quantity
    }, 0)
  },
  cartTotalPrice: (state: ICartState, _state, _rootState, rootGetters) => {
    console.log('root', rootGetters)

    const totalDiscount = rootGetters['cupons/getTotalDiscount']

    console.log(totalDiscount)
    const total = state.items.reduce((total: number, product: ICartItem) => {
      return total + product.price * product.quantity
    }, 0)

    if (totalDiscount) {
      return total - totalDiscount * 100
    } else {
      return total
    }
  },
}

const actions: ActionTree<ICartState, ICartState> = {
  addProductToCart({ state, commit }: ActionContext<ICartState, ICartState>, product: IProduct) {
    console.log('addToCart')
    if (product.inventory > 0) {
      const cartItem = state.items.find((item: ICartItem) => item.id === product.id)

      if (!cartItem) {
        commit('pushProductToCart', { ...product })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock
      commit('products/decrementProductInventory', { id: product.id }, { root: true })
    }
  },

  decreaseProductFromCart(
    { state, commit }: ActionContext<ICartState, ICartState>,
    product: IProduct
  ) {
    if (product.inventory > 0) {
      const cartItem = state.items.find((item: ICartItem) => item.id === product.id)

      if (cartItem) {
        if (cartItem.quantity == 1) {
          commit('removeProductFromCart', cartItem)
        } else {
          commit('decrementItemQuantity', cartItem)
        }
      }
      // remove 1 item from stock
      commit('products/decrementProductInventory', { id: product.id }, { root: true })
    }
  },
  clearCartItems({ commit }: ActionContext<ICartState, ICartState>) {
    commit('clearCartItems')
  },
  setCartOrderData({ commit }: ActionContext<ICartState, ICartState>, order: IOrderData) {
    commit('setCartOrderData', order)
  },
}

const mutations: MutationTree<ICartState> = {
  pushProductToCart(state: ICartState, item: ICartItem) {
    state.items.push({
      ...item,
      quantity: 1,
    })
  },

  clearCartItems(state: ICartState) {
    state.items = []
  },

  incrementItemQuantity(state: ICartState, { id }: ICartItem) {
    const cartItem = state.items.find((item) => item.id === id)
    console.log(cartItem, 'increment')
    if (cartItem) {
      cartItem.quantity++
    }
  },
  removeProductFromCart(state: ICartState, { id }: ICartItem) {
    const cartItemIndex = state.items.findIndex((item) => item.id === id)
    if (cartItemIndex !== -1) {
      state.items.splice(cartItemIndex, 1)
    }
  },
  decrementItemQuantity(state: ICartState, { id }: ICartItem) {
    const cartItem = state.items.find((item) => item.id === id)
    if (cartItem) {
      cartItem.quantity--
    }
  },

  setCartItems(state: ICartState, { items }: { items: ICartItem[] }) {
    state.items = items
  },

  setCheckoutStatus(state: ICartState, status: string | null) {
    state.checkoutStatus = status
  },

  setCartOrderData(
    state: ICartState,
    { address, payment, userInfo, orderId, products, total, subtotal }: IOrderData
  ) {
    state.order.address = address
    state.order.payment = payment
    state.order.userInfo = userInfo
    state.order.id = orderId
    state.order.products = products
    state.order.total = total
    state.order.subtotal = subtotal
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
