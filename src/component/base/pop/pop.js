/**
 * pop 弹出层组件
 *
 * @prop direction - 弹出方向（left | right | top | bottom）
 * @prop speed - 弹出速度
 * @prop type - 弹出类型
 * @prop part - 在一个父类元素弹出，默认为否即在当前文档之外弹窗
 *
 * @slot - 弹窗的主体内容
 *
 * @event show - 显示之后的钩子函数
 * @event hide - 隐藏之后的钩子函数
 */

import './pop.scss'
import './pop.m.scss'

import render from './pop.render'
import baseMixin from '../../../mixin/base'

import slideTransition from '../../transition/slide'

const popComp = {
  name: 'pop',

  render,

  mixins: [baseMixin],

  components: {
    'slide-transition': slideTransition
  },

  props: {
    type: {
      type: String,
      default: 'slide'
    },
    direction: {
      type: String,
      default: 'top'
    },
    speed: {
      type: String,
      default: 'normal'
    },
    part: {
      type: Boolean,
      default: false
    }
  },

  data() {
    this.compName = 'pop'

    return {
      // 弹出层显示状态
      popDisplay: false,
      // 弹出层的 top
      top: 0,
      // 弹出层的 left
      left: 0
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-pop`
    },
    // 组件类组合
    compClass() {
      return [
        this.cPrefix,
        this.xclass(`direction-${this.direction}`),
        this.xclass(`type-${this.type}`),
        this.xclass(`speed-${this.speed}`),
        { [this.xclass('part')]: this.part }
      ]
    },
    // 弹出层的位置样式
    positionStyle() {
      return {
        top: this.top + 'px',
        left: this.left + 'px'
      }
    }
  },

  methods: {
    _init() {
      if (!this.part) {
        window.addEventListener('resize', (event) => {
          this.computePosition()
        })
      }
    },

    /**
     * 设置 pop 的位置
     */
    position({ top, left }) {
      this.$el.style.top = top
      this.$el.style.left = left
      this.left = left
      this.top = top

      return {
        top,
        left
      }
    },

    /**
    * 计算弹出层的位置
    */
    computePosition({
      popW = this.$el.offsetWidth,
      popH = this.$el.offsetHeight,
      parentW = window.innerWidth,
      parentH = window.innerHeight,
      cb
    } = {}) {
      let offsetW = parentW - popW
      let offsetH = parentH - popH
      let left = offsetW < 0 ? 0 : offsetW / 2
      let top = offsetH < 0 ? 0 : offsetH / 2

      return this.position({
        top,
        left
      })
    },

    /**
     * 初始化弹出层的位置
     */
    initPosition({ parentW = 0, parentH = 0, cb } = {}) {
      this.$el.style.visibility = 'hidden'
      this.$el.style.display = ''

      this.computePosition()

      this.$el.style.display = 'none'
      this.$el.style.visibility = ''
    },

    /**
     * 显示pop
     *
     * @param {Object} opt - 选项
     *                       {Function} cb - 显示之后的回调函数
     * @return {Object}
     */
    show({ cb } = {}) {

      this.$refs.transition.$off('afterEnter')
      this.$refs.transition.$on('afterEnter', () => {
        cb && cb()

        this.popDisplay = true

        return this.$emit('show')
      })

      this.$refs.transition.enter()

      return this
    },

    /**
     * 隐藏pop
     *
     * @param {Object} opt - 选项
     *                       {Function} cb - 隐藏之后的回调函数
     * @return {Object}
     */
    hide({ cb } = {}) {
      this.$refs.transition.$off('afterLeave')
      this.$refs.transition.$on('afterLeave', () => {
        cb && cb()

        this.popDisplay = false

        return this.$emit('hide')
      })

      this.$refs.transition.leave()

      return this
    }
  }
}

export default popComp
