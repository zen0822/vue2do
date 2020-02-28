import './App.scss'
import template from './App.pug'
import store from '../vuex/store'
import {
  defineComponent,
  ref
} from '@vue/composition-api'

require('file-loader?name=favicon.ico!../asset/img/favicon.ico')

export default defineComponent({
  name: 'App',
  store,
  template: template(),
  setup() {
    const contentHeight = ref(0)

    return {
      contentHeight
    }
  }
})
