import './Loading.scss'
import pug from './Loading.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompLoading',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
