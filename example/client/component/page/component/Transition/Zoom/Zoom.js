import '../Transition.scss'

import template from './Zoom.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompTransitionZoom',

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
    }
  }
}
