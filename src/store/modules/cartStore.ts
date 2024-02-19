import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'
import { Product } from './productsStore'

interface CartItem extends Product {
  quantity: number
}

export type PaymentTypes = 'CREDIT' | 'BILLET' | 'PIX'
export interface UserData {
  name: string
  phone: string
  email: string
  cpf: string
}
export interface AddressData {
  street: string
  streetNumber: number | string
  uf: string
  city: string
  cep: string
}
interface CardData {
  user: string
  number: string
  cvv: string
  date: string
}
export interface PaymentData {
  type: PaymentTypes
  card: CardData
}
export interface OrderData {
  orderId: string | number | null
  userInfo: UserData
  address: AddressData
  payment: PaymentData
  products: CartItem[] | []
  total: number
}

export interface CheckoutData {
  userInfo: UserData
  address: AddressData
  payment: PaymentData
}
interface CartState {
  items: CartItem[]
  order: {
    id: string | number | null
    userInfo: UserData | null
    address: AddressData | null
    payment: { type: PaymentTypes | null; card: CardData | null }
    products: CartItem[] | []
    total: number
  }

  checkoutStatus: string | null
}

const state: CartState = {
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

const getters: GetterTree<CartState, CartState> = {
  cartTotalPrice: (state: CartState) => {
    return state.items.reduce((total: number, product: CartItem) => {
      return total + product.price * product.quantity
    }, 0)
  },
}

const actions: ActionTree<CartState, CartState> = {
  addProductToCart({ state, commit }: ActionContext<CartState, CartState>, product: Product) {
    console.log('addToCart')
    if (product.inventory > 0) {
      const cartItem = state.items.find((item: CartItem) => item.id === product.id)

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
    { state, commit }: ActionContext<CartState, CartState>,
    product: Product
  ) {
    if (product.inventory > 0) {
      const cartItem = state.items.find((item: CartItem) => item.id === product.id)

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
  clearCartItems({ commit }: ActionContext<CartState, CartState>) {
    commit('clearCartItems')
  },
  setCartOrderData({ commit }: ActionContext<CartState, CartState>, order: OrderData) {
    commit('setCartOrderData', order)
  },
}

const mutations: MutationTree<CartState> = {
  pushProductToCart(state: CartState, item: CartItem) {
    state.items.push({
      ...item,
      quantity: 1,
    })
  },

  clearCartItems(state: CartState) {
    state.items = []
  },

  incrementItemQuantity(state: CartState, { id }: CartItem) {
    const cartItem = state.items.find((item) => item.id === id)
    console.log(cartItem, 'increment')
    if (cartItem) {
      cartItem.quantity++
    }
  },
  removeProductFromCart(state: CartState, { id }: CartItem) {
    const cartItemIndex = state.items.findIndex((item) => item.id === id)
    if (cartItemIndex !== -1) {
      state.items.splice(cartItemIndex, 1)
    }
  },
  decrementItemQuantity(state: CartState, { id }: CartItem) {
    const cartItem = state.items.find((item) => item.id === id)
    if (cartItem) {
      cartItem.quantity--
    }
  },

  setCartItems(state: CartState, { items }: { items: CartItem[] }) {
    state.items = items
  },

  setCheckoutStatus(state: CartState, status: string | null) {
    state.checkoutStatus = status
  },

  setCartOrderData(
    state: CartState,
    { address, payment, userInfo, orderId, products, total }: OrderData
  ) {
    state.order.address = address
    state.order.payment = payment
    state.order.userInfo = userInfo
    state.order.id = orderId
    state.order.products = products
    state.order.total = total
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
