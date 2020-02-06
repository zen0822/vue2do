import './Pop.scss'
import pugTpl from './Pop.pug'
import mixin from '../../mixin'

import homeBgImg from 'exAsset/home-bg.jpg'

export default {
  name: 'PageCompPop',

  template: pugTpl(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test',
      homeBgImg
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
