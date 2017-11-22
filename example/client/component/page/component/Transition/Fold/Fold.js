import '../Transition.scss'

import template from './Fold.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompTransitionFold',

  template: template(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    unfold() {
      this.$refs.fold.enter()
    },
    fold() {
      this.$refs.fold.leave()
    }
  }
}
