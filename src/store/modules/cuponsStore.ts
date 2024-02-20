import { CuponsService } from '@/services/cupons'
import { ICupom } from '@/types/globals/cupons'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

interface ICuponsState {
  list: ICupom[] | []
  activateCupons: ICupom[]
}

const state: ICuponsState = {
  list: [],
  activateCupons: [],
}

const getters: GetterTree<ICuponsState, ICuponsState> = {
  getTotalDiscount(state: ICuponsState) {
    const totalDiscout = state.activateCupons.reduce((acc, current) => {
      return acc + current.discount
    }, 0)

    return totalDiscout
  },
}

const actions: ActionTree<ICuponsState, ICuponsState> = {
  async getAllCupons({ commit }: ActionContext<ICuponsState, ICuponsState>) {
    const data = await CuponsService.getAll()
    commit('setCupons', data)
  },
  activateCupom({ commit }: ActionContext<ICuponsState, ICuponsState>, cupom: ICupom) {
    commit('activateCupom', cupom)
  },

  clearActivatedCupons({ commit }: ActionContext<ICuponsState, ICuponsState>) {
    commit('clearActivatedCupons')
  },
}

const mutations: MutationTree<ICuponsState> = {
  setCupons(state: ICuponsState, cupons: ICupom[]) {
    state.list = cupons
  },
  activateCupom(state: ICuponsState, cupom: ICupom) {
    const findedCupom = state.list.find((stateCupom) => stateCupom.id === cupom.id)

    if (findedCupom) {
      findedCupom.isActive = true
      state.activateCupons.push(findedCupom)
    }
  },
  clearActivatedCupons(state: ICuponsState) {
    state.activateCupons = []
    state.list = state.list.map((cupom) => {
      return {
        ...cupom,
        isActive: false,
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
