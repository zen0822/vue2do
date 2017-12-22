import template from './Fade.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompMotionFade',

  template: template(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    fadeIn() {
      this.$refs.fade.enter()
    },
    fadeOut() {
      this.$refs.fade.leave()
    }
  }
}
