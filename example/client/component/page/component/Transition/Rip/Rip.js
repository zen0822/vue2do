import '../Transition.scss'

import template from './Rip.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompTransitionRip',

  template: template(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    rip() {
      this.$refs.rip.enter()
    }
  }
}
