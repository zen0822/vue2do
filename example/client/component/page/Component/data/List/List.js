import './List.scss'
import pug from './List.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompList',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
