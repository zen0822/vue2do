import nameSpace from './type.json'

export default {
  state: {
    alert: [],
    confirm: [],
    tip: [],
    deviceSize: ''
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
    },
    [nameSpace.deviceSize](state) {
      return state.deviceSize.replace(/('|")/g, '')
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
    },
    [nameSpace.deviceSize]({ state, commit, rootState }, sizeName) {
      return commit(nameSpace.deviceSize, sizeName)
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
    },
    [nameSpace.deviceSize](state, sizeName) {
      state.deviceSize = sizeName
    }
  }
}
