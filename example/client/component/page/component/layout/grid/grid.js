import './grid.scss'
import template from './grid.tpl'
import mixin from '../../mixin'

export default {
  template,

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
