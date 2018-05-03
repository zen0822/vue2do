import nameSpace from './type.json'

export default {
  state: {
    window: null,
    appContent: null,
    compStage: null,
    typeUI: 'bootstrap',
    typeTheme: 'primary'
  },

  getters: {
    [nameSpace.window.get](state) {
      return state.window
    },
    [nameSpace.appContent.get](state) {
      return state.appContent
    },
    [nameSpace.compStage.get](state) {
      return state.compStage
    },
    [nameSpace.typeUI.get](state) {
      return state.typeUI
    },
    [nameSpace.typeTheme.get](state) {
      return state.typeTheme
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
    },
    [nameSpace.compStage.add]({
      state,
      commit,
      rootState
    }, item) {
      return commit(nameSpace.compStage.add, item)
    },
    [nameSpace.typeTheme.add]({
      state,
      commit,
      rootState
    }, value) {
      return commit(nameSpace.typeTheme.add, value)
    },
    [nameSpace.typeUI.add]({
      state,
      commit,
      rootState
    }, value) {
      return commit(nameSpace.typeUI.add, value)
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
    },
    [nameSpace.compStage.add](state, vm) {
      state.compStage = vm.$el
    },
    [nameSpace.typeUI.add](state, value) {
      state.typeUI = value
    },
    [nameSpace.typeTheme.add](state, value) {
      state.typeTheme = value
    }
  }
}
