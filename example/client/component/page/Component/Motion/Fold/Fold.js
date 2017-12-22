import template from './Fold.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompMotionFold',

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
