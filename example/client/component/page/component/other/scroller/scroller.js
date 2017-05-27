import './scroller.scss'
import pug from './scroller.pug'
import mixin from '../../mixin'

export default {
  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
