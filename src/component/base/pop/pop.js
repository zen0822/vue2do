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
      // 弹窗的相关信息
      popDetail: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        parentWidth: 0,
        parentHeight: 0
      }
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
        top: this.popDetail.top + 'px',
        left: this.popDetail.left + 'px'
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
    * 计算弹出层的位置
    */
    computePosition() {
      let ele = this.elementProp(this.$el)

      this.popDetail = Object.assign({}, this.popDetail, {
        top: (window.innerHeight - ele.offsetHeight) / 2,
        left: (window.innerWidth - ele.offsetWidth) / 2
      })

      Object.assign(this.$el.style, {
        top: this.popDetail.top,
        left: this.popDetail.left
      })
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
