/**
 * col 组件
 *
 * @props gap - 定义间隔的宽度（px），覆盖行设置的间隔 (5, 10, 20, 30, 40, 50)
 * @props pull - 定义了列在 x 反方向偏移的栅格数
 * @props push - 定义了列在 x 正方向偏移的栅格数
 * @props offset - 定义了列离开头的栅格数
 * @props span - 定义了列在行上的水平跨度（采用 12 栏栅格）
 * @props xs - 加小设备的水平跨度栅格数
 * @props s - 小设备的水平跨度栅格数
 * @props m - 中设备的水平跨度栅格数
 * @props l - 大型设备的水平跨度栅格数
 * @props xl - 超大型设备的水平跨度栅格数
 * @props grid - 集合所有设备水平跨度的栅格数
 *
 */

import './col.scss'
import render from './col.render.js'
import baseMixin from '../../../../mixin/base'

export default {
  name: 'col',

  mixins: [baseMixin],

  render,

  props: {
    gap: {
      type: Number,
      default: 0
    },

    pull: {
      type: Number,
      default: 0
    },

    push: {
      type: Number,
      default: 0
    },

    offset: {
      type: Number,
      default: 0
    },

    span: {
      type: Number,
      default: 0
    },

    xs: {
      type: Number,
      default: 0
    },

    s: {
      type: Number,
      default: 0
    },

    m: {
      type: Number,
      default: 0
    },

    l: {
      type: Number,
      default: 0
    },

    xl: {
      type: Number,
      default: 0
    },

    grid: Object
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-col`
    }
  }
}
