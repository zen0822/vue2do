import './Check.scss'
import pug from './Check.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompCheck',

  template: pug(),

  mixins: [mixin],

  computed: {
    testOpt() {
      return [{
        value: 1,
        text: 'a',
        disable: true
      }, {
        value: 2,
        text: 'b'
      }, {
        value: 3,
        text: 'c'
      }, {
        value: 4,
        text: 'd',
        disable: true
      }, {
        value: 5,
        text: 'e',
        disable: true
      }, {
        value: 6,
        text: 'g'
      }]
    }
  },

  data() {
    return {
      testName: 'test'
    }
  }
}
