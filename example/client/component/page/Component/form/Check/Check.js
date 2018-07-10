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
        text: 'a'
      }, {
        value: 2,
        text: 'b',
        disabled: true
      }, {
        value: 3,
        text: 'c'
      }, {
        value: 4,
        text: 'd',
        disabled: true
      }, {
        value: 5,
        text: 'e',
        disabled: true
      }, {
        value: 6,
        text: 'g'
      }]
    },
    testOpt2() {
      return [{
        value: 1,
        text: 'a'
      }, {
        value: 2,
        text: 'b'
      }, {
        value: 3,
        text: 'c'
      }, {
        value: 4,
        text: 'd'
      }, {
        value: 5,
        text: 'e'
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
