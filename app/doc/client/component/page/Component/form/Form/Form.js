import pug from './Form.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompForm',

  template: pug(),

  mixins: [mixin],

  methods: {
    submit() {
      this.$refs.submit.openLoading()
      if (this.$refs.formArea.verify()) {
        console.log(this.$refs.formArea.queryOpt)
      } else {
        console.warn('verify error!')
      }

      setTimeout(() => {
        this.$refs.submit.closeLoading()
      }, 5000)
    }
  }
}
