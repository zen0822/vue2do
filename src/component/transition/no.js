/**
 * no transition component - 没有任何效果的过渡
 *
 * @prop speed - 淡出速度
 */

import baseMixin from './mixin'

export default {
  mixins: [baseMixin],

  computed: {
    transition() {
      return `${this.transitionTime} ease-out`
    }
  },

  render(h) {
    return h('transition', {
      on: {
        beforeEnter: (el) => {
          el.style.transition = this.transition

          this.$emit('beforeEnter')
        },

        enter: (el) => {
          this.$emit('enter')
        },

        afterEnter: (el) => {
          el.style.transition = ''

          this.$emit('afterEnter')
        },

        beforeLeave: (el) => {
          el.style.transition = this.transition

          this.$emit('beforeLeave')
        },

        leave: (el) => {
          this.$emit('leave')
        },

        afterLeave: (el) => {
          el.style.transition = ''

          this.$emit('afterLeave')
        }
      }
    }, this.$slots.default)
  }
}
