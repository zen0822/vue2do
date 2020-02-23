import './Grid.scss'
import pug from './Grid.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompGrid',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
