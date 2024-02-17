import { createStore } from 'vuex'
import cart from './modules/cartStore'
import products from './modules/productsStore'

export default createStore({
  modules: {
    cart,
    products,
  },
})
