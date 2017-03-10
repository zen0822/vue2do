import nameSpace from './type.json'

export default {
  state: {
    alert: [],
    confirm: [],
    tip: []
  },

  getters: {
    [nameSpace.alert.get](state) {
      return state.alert.pop()
    },
    [nameSpace.confirm.get](state) {
      return state.confirm.pop()
    },
    [nameSpace.tip.get](state) {
      return state.tip.pop()
    }
  },

  actions: {
    [nameSpace.alert.add]({ state, commit, rootState }, component) {
      return commit(nameSpace.alert.add, component)
    },
    [nameSpace.confirm.add]({ state, commit, rootState }, component) {
      return commit(nameSpace.confirm.add, component)
    },
    [nameSpace.tip.add]({ state, commit, rootState }, component) {
      return commit(nameSpace.tip.add, component)
    }
  },

  mutations: {
    [nameSpace.alert.add](state, component) {
      state.alert.push(component)
    },
    [nameSpace.tip.add](state, component) {
      state.tip.push(component)
    },
    [nameSpace.confirm.add](state, component) {
      state.confirm.push(component)
    }
  }
}
