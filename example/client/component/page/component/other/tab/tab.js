import './tab.scss'
import pug from './tab.pug'
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
