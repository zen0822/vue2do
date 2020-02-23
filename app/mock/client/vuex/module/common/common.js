import nameSpace from './type.json'

export default {
  state: {
    ex: ''
  },

  getters: {
    [nameSpace.ex.add](state) {
      return state.ex
    }
  },

  actions: {
    [nameSpace.ex.add]({
      commit
    }, item) {
      return commit(nameSpace.ex.add, item)
    }
  },

  mutations: {
    [nameSpace.ex.add](state, str) {
      state.ex = str
    }
  }
}
