import commonStore from '../../vuex/module/common/type.json'
import { useState } from '../../vuex/store'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

const typeUI = useState(commonStore.typeUI.get)
const typeTheme = useState(commonStore.typeTheme.get)

export {
  typeUI,
  typeTheme
}
