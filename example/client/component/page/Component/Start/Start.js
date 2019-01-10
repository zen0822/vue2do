import './Start.scss'
import pug from './Start.pug'
import mixin from '../mixin'
import hmr from 'ex/client/util/hmr'

const PageCompStart = {
  name: 'PageCompStart',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'testd'
    }
  }
}

export default hmr({
  module,
  comp: PageCompStart
})
