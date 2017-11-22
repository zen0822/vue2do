import './Transition.scss'

import template from './Transition.pug'
import mixin from '../mixin'

export default {
  name: 'PageCompTransition',

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
    },
    fadeIn() {
      this.$refs.fade.enter()
    },
    fadeOut() {
      this.$refs.fade.leave()
    },
    unfold() {
      this.$refs.fold.enter()
    },
    fold() {
      this.$refs.fold.leave()
    },
    rip() {
      this.$refs.rip.enter()
    }
  }
}
