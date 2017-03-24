import './btn.scss'
import template from './btn.tpl'
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
