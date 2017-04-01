/**
 * code 组件
 *
 * @props code - 代码
 *
 */

import './code.scss'
import render from './code.render.js'
import baseMixin from 'src/mixin/base'

export default {
  name: 'code',

  mixins: [baseMixin],

  render,

  props: {
    code: {
      type: String,
      default: ''
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
  },

  beforeCreate() {
  }
}
