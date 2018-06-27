/**
 * slide motion component - 滑动过度效果
 *
 * @prop offset - 元素滑动的偏移值,
 *                direction 为 south：实例顶部距离实例的 offsetParent 的顶部的偏移值
 *                direction 为 north：实例低部距离实例的 offsetParent 的低部的偏移值
 *                direction 为 west：实例右边距离实例的 offsetParent 的右边的偏移值
 *                direction 为 east：实例左边距离实例的 offsetParent 的左边的偏移值
 * @prop direction - 滑动方向(north | east | west | south)
 * @prop global - 元素的位置是否是以可视界面的相对定位 (fixed)，默认为否（绝对定位 absolute）
 * @prop speed - 淡出速度
 * @prop display - 默认一开始是隐藏（进来之前的状态）
 * @prop sync - 当处于进来动画，再次调用进来动画是否执行，同离开动画
 * @prop once - 当处于进来的状态时不可以再触发进来的动画，同离开动画
 *
 * @event beforeEnter - 进来过渡之前
 * @event enter - 进来过渡期间
 * @event afterEnter - 进来过渡完成
 * @event beforeLeave - 离开过渡之前
 * @event leave - 离开过渡期间
 * @event afterLeave - 离开过渡之后
 */

import motionMixin from '../../mixin/motion'

export default {
  name: 'MotionSlide',

  mixins: [motionMixin],

  props: {
    direction: {
      type: String,
      default: 'south',
      validator(val) {
        return ['north', 'east', 'west', 'south'].includes(val)
      }
    },
    global: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 0
    }
  },

  data() {
    this.moving = false // 是否正在执行过渡动画

    return {
      transiting: false,
      isEnter: false,
      isLeaving: false,
      slideOffset: {}
    }
  },

  computed: {
    translate() {
      return this._getTranslate()
    },
    transition() {
      return `transform ${this.transitionTime} ease-out`
    },
    positionType() {
      return this.global ? 'fixed' : 'absolute'
    }
  },

  methods: {
    /**
     *
     * @param {Object} opt -
     *                      {Number} top
     *                      {Number} left
     * @return {String} - 过渡的样式声明
     *
     */
    _getTranslate() {
      switch (this.direction) {
        case 'south':
          return `translateY(-100%) translateY(-${this.slideOffset}px)`
        case 'north':
          return `translateY(100%) translateY(${this.slideOffset}px)`
        case 'east':
          return `translateX(-100%) translateY(-${this.slideOffset}px)`
        case 'west':
          return `translateX(100%) translateY(${this.slideOffset}px)`
        default:
          return `translateY(-100%) translateY(-${this.slideOffset}px)`
      }
    },

    /**
     * 设置 offset 属性
     */
    setOffset(value) {
      this.slideOffset = value

      return this
    },

    beforeEnter({
      code
    } = {}) {
      this.$emit('beforeEnter')

      let el = this.$el

      Object.assign(el.style, {
        'position': this.positionType,
        'transition': this.transition,
        'transform': this._getTranslate()
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          code === this.code && (el.style.display = '')

          return resolve()
        }, 78)
      })
    },

    entering({
      code
    } = {}) {
      let el = this.$el
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      this.$emit('entering')

      Object.assign(el.style, {
        'transform': ''
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter() {
      let el = this.$el

      Object.assign(el.style, {
        'position': '',
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      return Object.assign(el.style, {
        'position': this.positionType,
        'transition': this.transition,
        'transform': ''
      })
    },

    leaveing({
      code
    } = {}) {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        'transform': this.translate
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          code === this.code && (el.style.display = 'none')

          return resolve()
        }, this.time)
      })
    },

    afterLeave() {
      let el = this.$el

      Object.assign(el.style, {
        'position': '',
        'transition': '',
        'transform': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  },

  created() {
    this.slideOffset = this.offset
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
