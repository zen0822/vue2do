import './tip.scss'
import template from './tip.tpl'
import mixin from '../../mixin'
import tip from 'src/component/base/message/tip'

export default {
  name: 'page-comp-tip',

  template,

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    tip() {
      tip('这是一个提示')
    }
  }
}
