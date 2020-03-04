import './Scroller.scss'
import pug from './Scroller.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompScroller',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
