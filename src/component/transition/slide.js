/**
 * slide transition component
 *
 * @prop direction - 弹出方向（left | right | top | bottom）
 * @prop speed - 弹出速度
 * @prop type - 弹出类型
 *
 * @event beforeEnter - 进来过渡之前
 * @event enter - 进来过渡期间
 * @event afterEnter - 进来过渡完成
 * @event beforeLeave - 离开过渡之前
 * @event leave - 离开过渡期间
 * @event afterLeave - 离开过渡之后
 */

import baseMixin from './mixin'

export default {
  mixins: [baseMixin],

  props: {
    direction: {
      type: String,
      default: 'top'
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },

  computed: {
    translate() {
      switch (this.direction) {
        case 'top':
          return `translateY(calc(-100% - ${this.top}px))`
        case 'bottom':
          return `translateY(calc(100% + ${this.top}px))`
        case 'left':
          return `translateX(calc(-100% - ${this.left}px))`
        case 'right':
          return `translateX(calc(100% + ${this.left}px))`
        default:
          return `translateY(calc(-100% - ${this.top}px))`
      }
    },
    transition() {
      return `transform ${this.transitionTime} ease-out`
    }
  },

  render(h) {
    return h('transition', {
      on: {
        beforeEnter: (el) => {
          el.style.visibility = 'hidden'
          el.style.display = ''

          el.style.transform = this.translate

          this.$emit('beforeEnter')
        },

        enter: (el) => {
          // HACK: 触发重绘
          let height = this.$el.offsetHeight

          el.style.transition = this.transition
          el.style.visibility = ''
          el.style.transform = ''

          this.$emit('enter')
        },

        afterEnter: (el) => {
          el.style.transition = ''

          this.$emit('afterEnter')
        },

        beforeLeave: (el) => {
          el.style.transform = ''
          el.style.transition = this.transition

          this.$emit('beforeLeave')
        },

        leave: (el) => {
          el.style.visibility = ''
          el.style.transform = this.translate

          this.$emit('leave')
        },

        afterLeave: (el) => {
          el.style.transition = ''
          el.style.transform = ''

          this.$emit('afterLeave')
        }
      }
    }, this.$slots.default)
  }
}
