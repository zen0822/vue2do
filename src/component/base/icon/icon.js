/**
 * icon 组件
 *
 * @props theme - 主题
 * @props size - 大小
 * @props type - 字符图标类型
 * @props kind - 图标的种类（ex：fa-circle -> kind='circle')
 *
 */

import 'font-awesome-sass-loader'
import './icon.scss'

import Vue from 'vue'
import render from './icon.render.js'
import baseMixin from 'vue2/mixin/base'

const SIZE_S = 'S'
const SIZE_M = 'M'
const SIZE_L = 'L'

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
      default: TYPE_FA
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
      return this.size.toLowerCase()
    },
    typeClass() {
      return this.type
    },
    nameClass() {
      return `fa-${this.kind}`
    }
  }
}

export default iconCompConfig
