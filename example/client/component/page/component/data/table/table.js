import './table.scss'
import template from './table.tpl'
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
