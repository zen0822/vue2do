/**
 * code 组件
 *
 * @prop code - 代码
 * @prop type - 语言类型
 *
 */

import './code.scss'
import render from './code.render.js'
import baseMixin from '../../../mixin/base'
import scrollerComp from '../../base/scroller/scroller'

export default {
  name: 'code',

  mixins: [baseMixin],

  render,

  components: {
    scroller: scrollerComp
  },

  props: {
    code: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },

  data() {
    return {
      lineNum: 3
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-code`
    }
  }
}
