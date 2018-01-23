/**
 * nav 组件
 *
 * @prop animate - 菜单显示动画()
 * @prop noSwitch - 菜单不要根据设备响应式切换
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
    noSwitch: {
      type: Boolean,
      default: false
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
      isActive: false,
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
      let transitionRef = this.$refs.motion

      this.isActive = true

      if (this.isFoldAnimate) {
        // TODO: 离开时 height 还是等于零如果这时候取值就会是不正确的
        // 所以要先置为空
        transitionRef.$el.style.height = ''
        let transitionHeight = this.elementProp(transitionRef.$el).offsetHeight
        transitionRef.setHeight(transitionHeight)
      }

      transitionRef.enter()
      this.$emit('show')
    },

    hide() {
      this.$refs.motion.leave()

      this.isActive = false
      this.$emit('hide')
    },

    toggle() {
      this.isActive = !this.isActive

      if (this.isActive) {
        return this.show()
      } else {
        return this.hide()
      }
    },

    changeByDeviceSize() {
      if (this.noSwitch) {
        return false
      }

      this.isSmallDevice ? this.hide() : this.show()
    }
  },

  mounted() {
    this.changeByDeviceSize()
  }
}
