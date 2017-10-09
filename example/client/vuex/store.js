// 组装不同的 store 并暴露出来
import Vue from 'vue'
import Vuex from 'vuex'

import common from './module/common/common'

Vue.use(Vuex)

const commonStore = new Vuex.Store({
  modules: {
    common
  }
})

export default commonStore

export {
  commonStore as common
}
