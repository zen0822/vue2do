import './transition.scss'

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
      this.$refs.zoom.enter()
    },
    zoomOut() {
      this.$refs.zoom.leave()
    },
    slideIn() {
      this.$refs.slide.enter()
    },
    slideOut() {
      this.$refs.slide.leave()
    }
  }
}
