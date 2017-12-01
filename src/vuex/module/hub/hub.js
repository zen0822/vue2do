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
    [hubNameSpace.input.add]({ state, commit, rootState }, component) {
      return commit(hubNameSpace.input.add, component)
    },

    [hubNameSpace.select.add]({ state, commit, rootState }, component) {
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
