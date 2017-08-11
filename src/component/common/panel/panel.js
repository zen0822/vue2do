/**
 * panel 组件
 *
 * @prop animate - 菜单显示动画
 * @prop initOpt - 菜单的数据
 * @prop kind - 菜单的种类
 * @prop trigger - 2，3 级菜单的触发模式
 * @prop type - 布局类型
 * @prop spreadAll - 打开全部一级菜单
 * @prop title - 菜单标题
 *
 * @event hide - 隐藏 panel
 */

import './panel.scss'
import render from './panel.render.js'
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
  name: 'panel',

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
    animate: {
      type: String,
      default: 'horizontal'
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

    wrap: {
      type: String,
      default: 'wrap'
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
      isStageActive: false
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-panel`
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
      this.isSmallDevice ? this.hide() : this.show()
    }
  },

  mounted() {
    this.$nextTick(() => [
      this.changeByDeviceSize(this.deviceSize)
    ])
  }
}
