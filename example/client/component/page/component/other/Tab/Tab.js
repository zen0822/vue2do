import './Tab.scss'
import pug from './Tab.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompTab',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
