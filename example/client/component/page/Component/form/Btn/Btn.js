import './Btn.scss'
import pug from './Btn.pug'
import mixin from '../../mixin'
import hmr from 'ex/client/util/hmr'

const PageCompBtn = {
  name: 'PageCompBtn',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test',
      btnRadius: 'S',
      btnType: 'button',
      btnSize: 'S'
    }
  },

  mounted() {
    this.$refs.btnRadius.$on('change', ({
      value
    }) => (this.btnRadius = value))

    this.$refs.btnSize.$on('change', ({
      value
    }) => (this.btnSize = value))

    this.$refs.btnType.$on('change', ({
      value
    }) => (this.btnType = value))
  }
}

export default hmr({
  module,
  comp: PageCompBtn
})
