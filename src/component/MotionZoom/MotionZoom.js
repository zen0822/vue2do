/**
 * zoom motion component - 放大缩小效果
 *
 * @prop speed - 淡出速度
 * @prop origin - 放大缩小的起始位置 (同 css 里的属性 'transform-origin')
 * @prop global - 元素的位置是否是以可视界面的相对定位 (fixed)，默认为否（绝对定位 absolute）
 * @prop display - 默认一开始是隐藏（进来之前的状态）
 * @prop speed - 动画速度
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
  name: 'MotionZoom',

  mixins: [motionMixin],

  props: {
    global: {
      type: Boolean,
      default: false
    },
    origin: {
      type: String,
      default: '50% 50%'
    }
  },

  computed: {
    positionType() {
      return this.global ? 'fixed' : 'absolute'
    },
    transition() {
      return `transform ${this.transitionTime} ease-out`
    }
  },

  methods: {
    beforeEnter({
      code
    } = {}) {
      this.$emit('beforeEnter')
      let el = this.$el

      Object.assign(el.style, {
        position: this.positionType,
        'transform-origin': this.origin,
        transition: this.transition,
        transform: 'scale(0)'
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

      Object.assign(el.style, {
        transform: ''
      })

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter({
      code
    } = {}) {
      let el = this.$el

      Object.assign(el.style, {
        position: '',
        'transform-origin': '',
        transition: ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave({
      code
    } = {}) {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        position: this.positionType,
        transform: '',
        'transform-origin': this.origin,
        transition: this.transition
      })

      return this.leaveing()
    },

    leaveing({
      code
    } = {}) {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        transform: 'scale(0)'
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          code === this.code && (el.style.display = 'none')

          return resolve()
        }, this.time)
      })
    },

    afterLeave({
      code
    } = {}) {
      let el = this.$el

      Object.assign(el.style, {
        position: '',
        transform: '',
        'transform-origin': '',
        transition: ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', {}, this.$slots.default)
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
