/**
 * nav 组件
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
 * @event hide - 隐藏 nav
 */

import './Nav.scss'
import './Nav.m.scss'
import render from './Nav.render.js'
import baseMixin from '../../mixin/base'

import Fold from '../Fold/Fold'
import FoldTitle from '../Fold/FoldTitle'
import FoldContent from '../Fold/FoldContent'

import MotionFold from '../MotionFold/MotionFold'
import MotionSlide from '../MotionSlide/MotionSlide'
import Icon from '../Icon/Icon'
import Row from '../Row/Row'
import Col from '../Col/Col'

const layoutType = ['grid', 'flex', 'flow']

export default {
  name: 'Nav',

  mixins: [baseMixin],

  render,

  components: {
    fold: Fold,
    'fold-title': FoldTitle,
    'fold-content': FoldContent,
    'motion-fold': MotionFold,
    'motion-slide': MotionSlide,
    row: Row,
    column: Col,
    icon: Icon
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
      navAnimate: ''
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-nav`
    },
    isSmallDevice() { // 判断设备是否小于 s 尺寸
      return this.deviceSize === 's' || this.deviceSize === 'xs'
    },
    isVerticalType() {
      return this.type === 'vertical'
    },
    isFoldAnimate() {
      return this.navAnimate === 'fold'
    }
  },

  watch: {
    deviceSize(val) {
      if (!val) {
        return false
      }

      this.changeByDeviceSize(val)
    },
    isStageActive(val) {
      val ? this.$refs.transition.enter() : this.$refs.transition.leave()
    }
  },

  methods: {
    _setDataOpt() {
      if (this.type === 'vertical') {
        this.navAnimate = this.animate ? this.animate : 'fold'
      } else if (this.type === 'horizontal') {
        this.navAnimate = this.animate ? this.animate : 'slide'
      }
    },

    show() {
      let transitionRef = this.$refs.transition

      this.isStageActive = true

      if (this.isFoldAnimate) {
        let transitionHeight = this.elementProp(transitionRef.$el).offsetHeight

        transitionRef.setHeight(transitionHeight)
      }

      transitionRef.enter()
      this.$emit('show')
    },

    hide() {
      this.$refs.transition.leave()

      this.isStageActive = false
      this.$emit('hide')
    },

    toggle() {
      this.isStageActive = !this.isStageActive

      if (this.isStageActive) {
        return this.show()
      } else {
        return this.hide()
      }
    },

    changeByDeviceSize() {
      if (!this.autoSwitch) {
        return false
      }

      this.isSmallDevice ? this.hide() : this.show()
    }
  },

  mounted() {
    this.changeByDeviceSize()
  }
}
