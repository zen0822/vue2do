import nameSpace from './type.json'

export default {
  state: {
    alert: null,
    confirm: null,
    tip: null,
    toast: null,
    tooltip: null,
    deviceSize: ''
  },

  getters: {
    [nameSpace.alert.get](state) {
      return state.alert
    },
    [nameSpace.confirm.get](state) {
      return state.confirm
    },
    [nameSpace.tip.get](state) {
      return state.tip
    },
    [nameSpace.toast.get](state) {
      return state.toast
    },
    [nameSpace.tooltip.get](state) {
      return state.tooltip
    },
    [nameSpace.deviceSize](state) {
      return state.deviceSize.replace(/('|")/g, '')
    }
  },

  actions: {
    [nameSpace.alert.add]({
      state,
      commit,
      rootState
    }, component) {
      return commit(nameSpace.alert.add, component)
    },
    [nameSpace.confirm.add]({
      state,
      commit,
      rootState
    }, component) {
      return commit(nameSpace.confirm.add, component)
    },
    [nameSpace.tip.add]({
      state,
      commit,
      rootState
    }, component) {
      return commit(nameSpace.tip.add, component)
    },
    [nameSpace.toast.add]({
      state,
      commit,
      rootState
    }, component) {
      return commit(nameSpace.toast.add, component)
    },
    [nameSpace.tooltip.add]({
      state,
      commit,
      rootState
    }, component) {
      return commit(nameSpace.tooltip.add, component)
    },
    [nameSpace.deviceSize]({
      state,
      commit,
      rootState
    }, sizeName) {
      return commit(nameSpace.deviceSize, sizeName)
    }
  },

  mutations: {
    [nameSpace.alert.add](state, component) {
      state.alert = component
    },
    [nameSpace.tip.add](state, component) {
      state.tip = component
    },
    [nameSpace.confirm.add](state, component) {
      state.confirm = component
    },
    [nameSpace.toast.add](state, component) {
      state.toast = component
    },
    [nameSpace.tooltip.add](state, component) {
      state.tooltip = component
    },
    [nameSpace.deviceSize](state, sizeName) {
      state.deviceSize = sizeName
    }
  }
}
