import './Btn.scss'
import pug from './Btn.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompBtn',

  template: pug(),

  mixins: [mixin],

  computed: {
    btnRadius() {
      return this.$refs.btnRadius.val()
    }
  },

  data() {
    return {
      testName: 'test'
    }
  }
}
