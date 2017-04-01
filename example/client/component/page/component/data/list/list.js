import './list.scss'
import template from './list.tpl'
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
