import './Input.scss'
import pug from './Input.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompInput',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    clickVerifyInput() {
      const verified = this.$refs.verifyInput.validate()

      return verified
    }
  }
}
