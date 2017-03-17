import './app.scss'
import template from './app.tpl'

import headerLayout from 'ex/client/component/layout/header-layout/header-layout'

require('file-loader?name=favicon.ico!src/asset/img/favicon.ico')

export default {
  name: 'app',
  template,
  components: {
    'header-layout': headerLayout
  }
}
