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
      tip('这是一个提示')
    },

    bubble(evnet) {
      event.stopPropagation()
      this.$refs.bubble.show(event.currentTarget)
    },

    clickParent() {
      this.$refs.bubble.hide(event.currentTarget)
    }
  }
}
