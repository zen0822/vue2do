import './check.scss'
import template from './check.tpl'
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
