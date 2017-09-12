import './modal.scss'
import pugTpl from './modal.pug'
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
    simple() {
      this.$refs.simple.show()
    },

    alert() {
      alert({
        message: '这是一个警告弹窗'
      })
    },

    confirm() {
      confirm({
        message: '这是一个确认弹窗',
        title: '测试确认弹出'
      })
    },

    showFullPop() {
      this.$refs.fullPop.show()
    },

    hideFullPop() {
      this.$refs.fullPop.hide()
    },

    purePop() {
      this.$refs.purePop.show()
    }
  }
}
