import hubNameSpace from './type.json'

export default {
  state: {
    select: [],
    input: []
  },

  getters: {
    [hubNameSpace.input.get](state) {
      return state.input
    }
  },

  actions: {
    [hubNameSpace.input.add]({ commit }, component) {
      return commit(hubNameSpace.input.add, component)
    },

    [hubNameSpace.select.add]({ commit }, component) {
      return commit(hubNameSpace.select.add, component)
    }
  },

  mutations: {
    [hubNameSpace.input.add](state, component) {
      state.input.push(component)
    },

    [hubNameSpace.select.add](state, component) {
      state.select.push(component)
    }
  }
}
