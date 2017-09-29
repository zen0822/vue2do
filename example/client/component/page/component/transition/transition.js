import template from './transition.pug'
import mixin from '../mixin'

export default {
  name: 'page-comp-transition',

  template: template(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    zoomIn() {
      this.$refs.slide.enter()
    },
    zoomOut() {
      this.$refs.slide.leave()
    }
  }
}
