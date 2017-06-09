import './grid.scss'
import pug from './grid.pug'
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
