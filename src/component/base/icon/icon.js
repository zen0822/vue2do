/**
 * icon 组件
 *
 * @prop theme - 主题
 * @prop size - 大小
 * @prop type - 字符图标类型
 * @prop kind - 图标的种类（ex：fa-circle -> kind='circle')
 *
 */

import '../../../asset/icon/iconfont.svg.js' // iconfont 的 svg 图标文件
import './icon.scss'

import Vue from 'vue'
import render from './icon.render.js'
import baseMixin from '../../../mixin/base'

const SIZE_S = 'S'
const SIZE_M = 'M'
const SIZE_L = 'L'
const SIZE_XL = 'XL'

const TYPE_ALI = 'ali'
const TYPE_FA = 'fa'

const iconCompConfig = {
  name: 'icon',

  render,

  mixins: [baseMixin],

  props: {
    size: {
      type: String,
      default: SIZE_S
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
      return `${this.compPrefix}-icon-${this.size.toLowerCase()}`
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

export default iconCompConfig
