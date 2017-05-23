import './pop.scss'
import pugTpl from './pop.pug'
import mixin from '../../mixin'
import { alert, confirm } from 'vue2do/index.js'

import homeBgImg from 'exAsset/home-bg.jpg'

export default {
  template: pugTpl(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test',
      homeBgImg
    }
  },

  methods: {
    alert() {
      alert({
        message: '这是一个弹窗'
      })
    },

    confirm() {
      confirm({
        message: '这是一个弹窗'
      })
    },

    customPop() {
      this.$refs.pop.show()
    },

    purePop() {
      this.$refs.purePop.show()
    }
  }
}
