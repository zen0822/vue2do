import nameSpace from './type.json'

export default {
  state: {
    window: null,
    appContent: null
  },

  getters: {
    [nameSpace.window.get](state) {
      return state.window
    },
    [nameSpace.appContent.get](state) {
      return state.appContent
    }
  },

  actions: {
    [nameSpace.window.add]({
      state,
      commit,
      rootState
    }, item) {
      return commit(nameSpace.window.add, item)
    },
    [nameSpace.appContent.add]({
      state,
      commit,
      rootState
    }, item) {
      return commit(nameSpace.appContent.add, item)
    }
  },

  mutations: {
    [nameSpace.window.add](state, {prop, value}) {
      state.window = {
        ...state.window,
        [prop]: value
      }
    },
    [nameSpace.appContent.add](state, vm) {
      state.appContent = vm
    }
  }
}
