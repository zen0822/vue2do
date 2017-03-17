import { row, col } from 'vue2do'

import './header-layout.scss'
import template from './header-layout.tpl'

export default {
  name: 'header-layout',

  template,

  components: {
    row,
    column: col
  },

  data() {
    return {
      logoUrl: require('src/asset/img/z-blue.png')
    }
  }
}
