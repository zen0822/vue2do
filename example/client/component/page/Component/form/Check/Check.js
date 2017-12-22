import './Check.scss'
import pug from './Check.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompCheck',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
