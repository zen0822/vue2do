import './input.scss'
import pug from './input.pug'
import mixin from '../../mixin'

import { tip } from 'vue2do/index'

export default {
  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    _init() {

    },

    clickVerifyInput() {
      let verified = this.$refs.verifyInput.verify()

      !verified && tip(this.$refs.verifyInput.dangerTip)
    }
  }
}
