import './Start.scss'
import pug from './Start.pug'
import mixin from '../mixin'

export default {
  name: 'PageCompStart',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'testd'
    }
  }
}
