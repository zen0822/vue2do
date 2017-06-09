import './welcome.scss'
import pug from './welcome.pug'
import mixin from '../component/mixin'
import { alert, confirm } from 'vue2do/index.js'

export default {
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
