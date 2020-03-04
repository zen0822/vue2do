/**
 * col 组件
 *
 * @prop gap - （已经废弃）定义间隔的宽度（px），覆盖行设置的间隔 (5, 10, 20, 30, 40, 50)
 * @prop pull - 定义了列在 x 反方向偏移的栅格数
 * @prop push - 定义了列在 x 正方向偏移的栅格数
 * @prop offset - 定义了列离开头的栅格数
 * @prop span - 定义了列在行上的水平跨度（采用 12 栏栅格）
 * @prop width - 可以使用 % 和 px 定义栏栅宽度（比 span 优先）
 * @prop xs - 加小设备的水平跨度栅格数
 * @prop s - 小设备的水平跨度栅格数
 * @prop m - 中设备的水平跨度栅格数
 * @prop l - 大型设备的水平跨度栅格数
 * @prop xl - 超大型设备的水平跨度栅格数
 * @prop grid - 集合所有设备水平跨度的栅格数
 * @prop grow - (draft)同 flex-grow属性，定义项目的放大比例
 * @prop shrink - (draft)同 flex-shrink属性，定义了项目的缩小比例
 */

// import './Col.scss' // Col.scss 已经改成从外部加载进来
import render from './Col.render.js'
import baseMixin from '../../mixin/base'

export default {
  name: 'Col',

  mixins: [baseMixin],

  render,

  props: {
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
      type: [Number, String],
      default: 0,
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val.includes('px')) {
          return true
        } else {
          return false
        }
      }
    },
    width: {
      type: String,
      validator(val) {
        return val.includes('px') || val.includes('%')
      }
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
    grid: Object,
    grow: {
      type: Number,
      default: 0
    },
    shrink: {
      type: Number,
      default: 0
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-col`
    },
    compStyle() {
      return {
        width: this.width,
        'flex-grow': this.grow === 0 ? undefined : this.grow
      }
    }
  }
}
