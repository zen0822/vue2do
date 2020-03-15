// 组装不同的 store 并暴露出来
import Vue from 'vue'
import Vuex from 'vuex'
import { computed } from '@vue/composition-api'
import common from './module/common/common'

Vue.use(Vuex)

const commonStore = new Vuex.Store({
  modules: {
    common
  }
})

export function useStore(): any {
  return commonStore
}

export function useState(name: string): any {
  return computed(() => commonStore.getters[name])
}

export default commonStore

export {
  commonStore as common
}
