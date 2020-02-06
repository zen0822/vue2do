/**
 * fade motion component
 *
 * @prop speed - 淡出速度
 * @prop opacity - 使用 css 定义的 opacity 淡入淡出
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
  name: 'MotionFade',

  mixins: [motionMixin],

  props: {
    opacity: {
      tyep: Boolean,
      default: false
    }
  },

  computed: {
    transition() {
      return `opacity ${this.transitionTime} ease-out`
    }
  },

  methods: {
    beforeEnter({
      code
    } = {}) {
      this.$emit('beforeEnter')

      const el = this.$el

      Object.assign(el.style, {
        transition: this.transition,
        opacity: 0
      })

      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            code === this.code && (el.style.display = '')

            resolve()
          }, 78)
        } catch (error) {
          reject(error)
        }
      })
    },

    entering() {
      const el = this.$el

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            Object.assign(el.style, {
              opacity: this.opacity ? '' : 1
            })

            setTimeout(() => {
              return resolve()
            }, this.time)
          }, 10)
        } catch (error) {
          reject(error)
        }
      })
    },

    afterEnter() {
      const el = this.$el

      Object.assign(el.style, {
        transition: '',
        opacity: ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      const el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        transition: this.transition
      })

      if (!this.opacity) {
        el.style.opacity = 1
      }

      return this.leaveing()
    },

    leaveing({
      code
    } = {}) {
      const el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        opacity: 0
      })

      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            code === this.code && (el.style.display = 'none')

            resolve()
          }, this.time)
        } catch (error) {
          reject(error)
        }
      })
    },

    afterLeave() {
      const el = this.$el

      Object.assign(el.style, {
        transition: '',
        opacity: ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
