import './Pop.scss'
import pugTpl from './Pop.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompPop',

  template: pugTpl(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    showPop() {
      this.testName = 'dddasfdddd sadfa sdfsa sdfsaf asdfasdf dfasdf sadfa'
      this.$refs.pop.show()
    },
    hidePop() {
      this.$refs.pop.hide()
    }
  }
}
