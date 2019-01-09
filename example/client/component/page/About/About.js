import './About.scss'
import pug from './About.pug'
import mixin from '../Component/mixin'
import {
  alert,
  confirm
} from 'vue2do/index.js'
import hmr from 'ex/client/util/hmr'

const PageAbout = {
  name: 'PageAbout',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      aboutText: '关于小熊'
    }
  },

  computed: {
    selectOpt() {
      this.testOpt.unshift({
        value: -1,
        text: '请选择'
      })

      return this.testOpt
    }
  }
}

if (module.hot) {
  const api = require('vue-hot-reload-api')
  const Vue = require('vue')

  api.install(Vue)

  if (!api.compatible) {
    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
  }

  module.hot.accept()

  if (!module.hot.data) {
    api.createRecord('very-unique-id', PageAbout)
  } else {
    api.rerender('very-unique-id', PageAbout)
    api.reload('very-unique-id', PageAbout)
  }
}

// hmr(PageAbout, () => {
//   console.log(`${PageAbout.name} hmr`)
// })

export default PageAbout
