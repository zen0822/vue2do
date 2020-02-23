import './Table.scss'
import pug from './Table.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompTable',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  }
}
