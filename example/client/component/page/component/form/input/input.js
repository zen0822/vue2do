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
    clickVerifyInput() {
      let verified = this.$refs.verifyInput.validate()
    }
  },

  mounted() {
    this.$refs.startInput && this.$refs.startInput.val('dedd')

    setTimeout(() => {
      this.$refs.startInput && this.$refs.startInput.val('')
    }, 2000)
  }
}
