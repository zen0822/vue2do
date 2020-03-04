import template from './Slide.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompMotionSlide',

  template: template(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    slideIn() {
      this.$refs.slide.enter()
    },
    slideOut() {
      this.$refs.slide.leave()
    }
  }
}
