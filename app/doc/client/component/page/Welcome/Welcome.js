import './Welcome.scss'
import pug from './Welcome.pug'
import mixin from '../Component/mixin'

export default {
  name: 'PageWelcome',

  template: pug(),

  mixins: [mixin],

  data() {
    return {

    }
  },

  computed: {
    selectOpt() {
      this.testOpt.unshift({
        value: -1,
        text: '请选择'
      })

      return this.testOpt
    }
  }
}
