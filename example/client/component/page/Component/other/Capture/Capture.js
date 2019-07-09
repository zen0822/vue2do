import './Capture.scss'
import pug from './Capture.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompCapture',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test',
      photoData: '',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  },

  methods: {
    captureChange({ data }) {
      this.photoData = data
    },
    startCamera() {
      return this.$refs.capture.start()
    }
  }
}
