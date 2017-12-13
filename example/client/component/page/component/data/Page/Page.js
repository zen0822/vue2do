import './Page.scss'
import template from './Page.tpl'
import mixin from '../../mixin'

export default {
  template,

  mixins: [mixin],

  data() {
    return {
      pageData: {
        length: 24,
        size: 5
      }
    }
  }
}
