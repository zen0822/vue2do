import './Tip.scss'
import template from './Tip.pug'
import mixin from '../../mixin'
import tip from 'src/component/Message/tip'
import toast from 'src/component/Message/toast'
import tooltip from 'src/component/Bubble/tooltip'

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
      tip('验证码校验啊速度放缓i吧 435345')
    },

    toast() {
      toast('底部弹出提示信息！')
    },

    showTooltip({
      event
    }) {
      event.stopPropagation()

      this.tooltip = tooltip({
        message: 'tooltip',
        target: event.currentTarget
      })
    },

    async bubble({
      event
    }) {
      let target = event.currentTarget

      event.stopPropagation()

      this.$refs.bubble.show(target)
    },

    clickParent() {
      this.$refs.bubble.hide()
      this.tooltip.hide && this.tooltip.hide()
    }
  }
}
