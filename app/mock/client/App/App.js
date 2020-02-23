import './App.scss'
import template from './App.pug'
import store from '../vuex/store'

require('file-loader?name=favicon.ico!../asset/img/favicon.ico')

export default {
  name: 'App',

  store,

  data() {
    return {
      contentHeight: 0
    }
  },

  template: template()
}
