import './About.scss'
import pug from './About.pug'
import mixin from '../Component/mixin'
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

export default hmr({
  module,
  comp: PageAbout,
  cb() {
    console.log(`${PageAbout.name} hmr is accepted.`)
  }
})
