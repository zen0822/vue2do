import './Btn.scss'
import pug from './Btn.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompBtn',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
