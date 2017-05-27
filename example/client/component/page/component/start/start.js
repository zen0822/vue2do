import './start.scss'
import pug from './start.pug'
import mixin from '../mixin'

export default {
  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'testd'
    }
  }
}
