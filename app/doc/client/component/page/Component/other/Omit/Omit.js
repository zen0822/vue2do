import './Omit.scss'
import pug from './Omit.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompOmit',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
