/**
 * pop 弹出层组件
 *
 * @prop direction - 只有当 position 为 center 生效，弹出方向（north | east | west | south）
 * @prop part - 在一个父类元素弹出，默认为否即在当前文档之外弹窗
 * @prop position - 弹出层最终的所在位置 (top | right | bottom | left | center)
 * @prop speed - 弹出速度
 * @prop type - 弹出类型
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
      default: 'south'
    },
    speed: {
      type: String,
      default: 'normal'
    },
    part: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'center'
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
        left: 0
      },
      // 弹出层的方向
      popDirection: 'south'
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
        this.xclass(`direction-${this.popDirection}`),
        this.xclass(`type-${this.type}`),
        this.xclass(`speed-${this.speed}`),
        {
          [this.xclass('part')]: this.part
        }
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

  watch: {
    direction(val) {
      this.popDirection = val
    }
  },

  methods: {
    _setDataOpt() {
      this.popDirection = this.direction

      if (this.position !== 'center') {
        switch (this.position) {
          case 'bottom':
            this.popDirection = 'north'
            break
          case 'top':
            this.popDirection = 'south'
            break
          case 'right':
            this.popDirection = 'west'
            break
          case 'left':
            this.popDirection = 'east'
            break
          default:
            this.popDirection = 'south'
            break
        }
      }
    },

    _init() {
      if (!this.part) {
        window.addEventListener('resize', (event) => {
          this.computePosition()
        })
      }
    },

    /**
     * 初始化弹出层
     */
    initPop() {
      let ele = this.elementProp(this.$el)
      let parentWidth = window.innerWidth
      let parentHeight = window.innerHeight
      let height = ele.offsetHeight
      let width = ele.offsetWidth
      let slideOffset = 0
      let popStyle = {}

      if (this.position !== 'center') {
        switch (this.position) {
          case 'bottom':
            popStyle = {
              top: parentHeight - height,
              left: (parentWidth - width) / 2
            }

            break
          case 'top':
            popStyle = {
              top: 0,
              left: (parentWidth - width) / 2
            }

            break
          case 'right':
            popStyle = {
              top: (parentHeight - height) / 2,
              left: parentWidth - width
            }

            break
          case 'left':
            popStyle = {
              top: (parentHeight - height) / 2,
              left: 0
            }

            break
          default:
            popStyle = {
              top: 0,
              left: (parentWidth - width) / 2
            }
        }

        slideOffset = 0
      } else {
        let top = (parentHeight - height) / 2
        let left = (parentWidth - width) / 2

        switch (this.popDirection) {
          case 'north':
          case 'south':
            slideOffset = top

            break
          case 'west':
          case 'east':
            slideOffset = left

            break
          default:
            slideOffset = top
        }

        popStyle = {
          top,
          left
        }
      }

      this.popDetail = Object.assign({}, this.popDetail, popStyle)
      Object.assign(this.$el.style, popStyle)
      this.$refs.transition.setOffset(slideOffset)
    },

    /**
     * 计算弹出层的位置
     */
    computePosition() {
      return this.initPop()
    },

    /**
     * 显示pop
     *
     * @param {Object} opt - 选项
     *                       {Function} cb - 显示之后的回调函数
     * @return {Object}
     */
    show({
      cb
    } = {}) {
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
    hide({
      cb
    } = {}) {
      this.$refs.transition.$off('afterLeave')
      this.$refs.transition.$on('afterLeave', () => {
        cb && cb()

        this.popDisplay = false

        return this.$emit('hide')
      })

      this.$refs.transition.leave()

      return this
    }
  },

  mounted() {
    this.computePosition()
  }
}

export default popComp
