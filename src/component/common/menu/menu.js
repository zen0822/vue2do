/**
 * menu 组件
 *
 * @prop animate - 菜单显示动画()
 * @prop autoSwitch - 菜单是否根据设备响应式切换
 * @prop initOpt - 菜单的数据
 * @prop kind - 菜单的种类
 * @prop only - 手风琴模式，一次只能打开一个面板
 * @prop trigger - 2，3 级菜单的触发模式
 * @prop type - 布局类型
 * @prop spreadAll - 打开全部一级菜单
 * @prop title - 菜单标题
 *
 * @event hide - 隐藏 menu
 */

import './menu.scss'
import './menu.m.scss'
import render from './menu.render.js'
import baseMixin from '../../../mixin/base'
import {
  foldComp,
  foldTitleComp,
  foldContentComp
} from '../../base/fold/fold'
import foldTransition from '../../transition/fold'
import iconComp from '../../base/icon/icon'
import rowComp from '../../common/layout/row/row'
import colComp from '../../common/layout/col/col'

const layoutType = ['grid', 'flex', 'flow']

export default {
  name: 'menu',

  mixins: [baseMixin],

  render,

  components: {
    'fold': foldComp,
    'fold-title': foldTitleComp,
    'fold-content': foldContentComp,
    'fold-transition': foldTransition,
    row: rowComp,
    column: colComp,
    icon: iconComp
  },

  props: {
    animate: String,

    autoSwitch: {
      type: Boolean,
      default: true
    },

    initOpt: Array,

    gap: {
      type: Number,
      default: 0
    },

    kind: {
      type: String,
      default: 'center'
    },

    only: {
      type: Boolean,
      default: false
    },

    spreadAll: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'horizontal'
    },

    trigger: {
      type: String,
      default: 'no'
    },

    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isStageActive: false,
      menuAnimate: ''
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-menu`
    },

    // 设备小于 L 尺寸
    isSmallDevice() {
      return this.deviceRange <= this._deviceTypeRange('<l')
    }
  },

  watch: {
    deviceSize(val) {
      this.changeByDeviceSize(val)
    }
  },

  methods: {
    _setDataOpt() {
      if (this.type === 'vertical') {
        this.menuAnimate = this.animate ? this.animate : 'fold'
      } else if (this.type === 'horizontal') {
        this.menuAnimate = this.animate ? this.animate : 'slide'
      }
    },

    show() {
      this.isStageActive = true
      this.$emit('show')
    },

    hide() {
      this.isStageActive = false
      this.$emit('hide')
    },

    toggle() {
      this.isStageActive = !this.isStageActive
    },

    changeByDeviceSize(size) {
      if (!this.autoSwitch) {
        return false
      }

      if (size === '<xl') {
        this.show()
      } else {
        this.hide()
      }
    }
  },

  mounted() {
    this.$nextTick(() => [
      this.changeByDeviceSize(this.deviceSize)
    ])
  }
}
