/**
 * 具有唯一 id 的组件
 */

import compNameSpace from './type.json'

export default {
  state: {
    menu: {},
    select: {},
    input: {}
  },

  getters: {
    [compNameSpace.common.get](state) {
      return state.input
    }
  },

  actions: {
    [compNameSpace.common.add]({ commit }, compOpt) {
      return commit(compNameSpace.common.add, compOpt)
    }
  },

  mutations: {
    [compNameSpace.common.add](state, { vm, name, id }) {
      state[name][id] = vm
    }
  }
}
