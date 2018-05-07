/**
 * icon 组件
 *
 * @prop theme - 主题
 * @prop size - 大小(xs, s, m, l, xl), 默认 s
 * @prop color - 颜色 16 进制
 * @prop type - 字符图标类型 (字符图标的 class 名的前缀，用户自己引入的字符图标的前缀)
 * @prop kind - 图标的种类（ex：fa-circle -> kind='circle'，ali-fold -> kind='fold')
 *
 */

import '../../asset/icon/iconfont.svg.js' // iconfont 的 svg 图标文件
import './Icon.scss'

import Vue from 'vue'
import render from './Icon.render.js'
import baseMixin from '../../mixin/base'

const TYPE_ALI = 'ali'
const TYPE_FA = 'fa'

export default {
  name: 'Icon',

  render,

  mixins: [baseMixin],

  props: {
    color: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: 's',
      validator(val) {
        return ['xs', 's', 'm', 'l', 'xl'].includes(val.toLowerCase())
      }
    },

    type: {
      type: String,
      default: TYPE_ALI
    },

    kind: {
      type: String,
      require: true
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-icon`
    },
    sizeClass() {
      return `${this.compPrefix}-icon-size-${this.size.toLowerCase()}`
    },
    isAli() {
      return this.type === 'ali'
    },
    typeClass() {
      return this.isAli ? `${this.compPrefix}-icon-${this.type}` : this.type
    },
    nameClass() {
      return this.isAli ? `ali-icon-${this.kind}` : `fa-${this.kind}`
    }
  }
}
