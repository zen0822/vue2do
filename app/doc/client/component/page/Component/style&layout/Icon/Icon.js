import pug from './Icon.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompIcon',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
