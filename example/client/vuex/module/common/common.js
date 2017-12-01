import nameSpace from './type.json'

export default {
  state: {
    window: null
  },

  getters: {
    [nameSpace.window.get](state) {
      return state.window
    }
  },

  actions: {
    [nameSpace.window.add]({
      state,
      commit,
      rootState
    }, item) {
      return commit(nameSpace.window.add, item)
    }
  },

  mutations: {
    [nameSpace.window.add](state, {prop, value}) {
      state.window = {
        ...state.window,
        [prop]: value
      }
    }
  }
}
