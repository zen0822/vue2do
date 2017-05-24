import './welcome.scss'
import pug from './welcome.pug'
import tip from 'src/component/base/pop/tip'
import alert from 'src/component/base/pop/alert'
import colComp from 'src/component/common/layout/col/col'
import rowComp from 'src/component/common/layout/row/row'
import mixin from '../component/mixin'

export default {
  template: pug(),

  components: {
    column: colComp,
    row: rowComp
  },

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
