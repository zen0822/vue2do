// 组装不同的 store 并暴露出来
import Vue from 'vue'
import Vuex from 'vuex'

import common from './module/common/common'
import hub from './module/hub/hub'

Vue.use(Vuex)

const commonStore = new Vuex.Store({
  modules: {
    common,
    hub
  }
})

export default commonStore

export {
  commonStore as common
}
