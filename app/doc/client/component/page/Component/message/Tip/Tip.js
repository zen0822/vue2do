import './Tip.scss'
import template from './Tip.pug'
import mixin from '../../mixin'

import tip from '@vue2do/component/module/Message/tip'
import toast from '@vue2do/component/module/Message/toast'
import tooltip from '@vue2do/component/module/Bubble/tooltip'

export default {
  name: 'PageCompTip',

  template: template(),

  mixins: [mixin],

  data() {
    this.tooltip = {}

    return {
      testName: 'test',
      bubbleTarget: this.$refs.bubbleTarget
    }
  },

  methods: {
    tip() {
      tip('验证码校验啊速度放缓i吧 345')
    },

    toast() {
      toast('底部弹出提示信息！')
    },

    showTooltip({
      event
    }) {
      this.tooltip = tooltip({
        message: 'tooltip',
        target: event.currentTarget
      })
    },

    async bubble({
      event
    }) {
      const target = event.currentTarget

      event.stopPropagation()

      this.$refs.bubble.show(target)
    },

    hideTooltip() {
      this.$refs.bubble.hide()
      this.tooltip.hide && this.tooltip.hide()
    }
  }
}
