/**
 * fade transition component
 *
 * @prop speed - 淡出速度
 * @prop opacity - 使用 css 定义的 opacity 淡入淡出
 */

import baseMixin from './mixin'

export default {
  mixins: [baseMixin],

  props: {
    speed: {
      type: [Number, String],
      default: 'normal'
    },

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

  render(h) {
    return h('transition', {
      on: {
        beforeEnter: (el) => {
          el.style.opacity = 0

          el.style.transition = this.transition

          this.$emit('beforeEnter')
        },

        enter: (el) => {
          // HACK: 触发重绘
          let height = this.$el.offsetHeight

          el.style.opacity = this.opacity ? '' : 1

          this.$emit('enter')
        },

        afterEnter: (el) => {
          el.style.transition = ''

          if (!this.opacity) {
            el.style.opacity = ''
          }

          this.$emit('afterEnter')
        },

        beforeLeave: (el) => {
          if (!this.opacity) {
            el.style.opacity = 1
          }

          el.style.transition = this.transition

          this.$emit('beforeLeave')
        },

        leave: (el) => {
          el.style.opacity = 0

          this.$emit('leave')
        },

        afterLeave: (el) => {
          el.style.transition = ''
          el.style.opacity = ''

          this.$emit('afterLeave')
        }
      }
    }, this.$slots.default)
  }
}
