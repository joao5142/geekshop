import { createStore } from 'vuex'
import cart from './modules/cartStore'

export default createStore({
  modules: {
    cart,
  },
})
