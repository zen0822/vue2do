import './table.scss'
import pug from './table.pug'
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
