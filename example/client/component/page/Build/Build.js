import './Build.scss'
import pug from './Build.pug'
import mixin from '../Component/mixin'

export default {
  name: 'PageBuild',

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
