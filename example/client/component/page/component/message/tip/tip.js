import './tip.scss'
import template from './tip.pug'
import mixin from '../../mixin'
import tip from 'src/component/base/message/tip'

export default {
  name: 'page-comp-tip',

  template: template(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test',
      bubbleTip: {

      }
    }
  },

  methods: {
    tip() {
      tip('验证码校验啊速度放缓i吧 435345')
    },

    async bubble(event) {
      let target = event.currentTarget

      event.stopPropagation()

      await this.$refs.bubble.hide()

      this.$refs.bubble.show(target)
    },

    clickParent() {
      this.$refs.bubble.hide()
    }
  }
}
