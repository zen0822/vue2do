import nameSpace from './type.json'

export default {
  state: {
    window: null,
    appContent: null,
    compStage: null,
    typeUI: 'bootstrap',
    typeTheme: 'primary',
    deviceSize: ''
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
    },
    [nameSpace.deviceSize](state) {
      return state.deviceSize.replace(/('|")/g, '')
    }
  },

  actions: {
    [nameSpace.window.add]({
      commit
    }, item) {
      return commit(nameSpace.window.add, item)
    },
    [nameSpace.appContent.add]({
      commit
    }, item) {
      return commit(nameSpace.appContent.add, item)
    },
    [nameSpace.compStage.add]({
      commit
    }, item) {
      return commit(nameSpace.compStage.add, item)
    },
    [nameSpace.typeTheme.add]({
      commit
    }, value) {
      return commit(nameSpace.typeTheme.add, value)
    },
    [nameSpace.typeUI.add]({
      commit
    }, value) {
      return commit(nameSpace.typeUI.add, value)
    },
    [nameSpace.deviceSize]({
      commit
    }, sizeName) {
      return commit(nameSpace.deviceSize, sizeName)
    }
  },

  mutations: {
    [nameSpace.window.add](state, {
      prop,
      value
    }) {
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
    },
    [nameSpace.deviceSize](state, sizeName) {
      state.deviceSize = sizeName
    }
  }
}
