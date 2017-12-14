/**
 * icon 组件
 *
 * @prop theme - 主题
 * @prop size - 大小
 * @prop type - 字符图标类型 (字符图标的 class 名的前缀，用户自己引入的字符图标的前缀)
 * @prop kind - 图标的种类（ex：fa-circle -> kind='circle')
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
  name: 'icon',

  render,

  mixins: [baseMixin],

  props: {
    size: {
      type: String,
      default: 'xs'
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
    // 组件类名的前缀
    cPrefix() {
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
