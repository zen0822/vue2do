import './welcome.scss'
import pug from './welcome.pug'
import tip from 'src/component/base/pop/tip'
import alert from 'src/component/base/pop/alert'
import mixin from '../component/mixin'

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
