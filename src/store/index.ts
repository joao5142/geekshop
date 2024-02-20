import { createStore } from 'vuex'
import cart from './modules/cartStore'
import products from './modules/productsStore'
import cupons from './modules/cuponsStore'
import loading from './modules/loadingStore'

export default createStore({
  modules: {
    cart,
    products,
    loading,
    cupons,
  },
})
