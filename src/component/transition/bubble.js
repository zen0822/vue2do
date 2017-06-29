/**
 * bubble transition component - 吹泡泡效果
 *
 * @prop speed - 淡出速度
 */

import baseMixin from './mixin'

export default {
  mixins: [baseMixin],

  computed: {
    transition() {
      return `transform ${this.transitionTime} ease-out`
    }
  },

  methods: {
    enter() {
      return this.beforeEnter()
    },

    leave() {
      this.beforeLeave()
    },

    beforeEnter() {
      this.$emit('beforeEnter')
      let el = this.$el

      Object.assign(el.style, {
        'transform-origin': '50% 0',
        'transition': this.transition,
        'transform': 'scale(0)',
      })

      setTimeout(() => {
        el.style.display = ''

        this.entering()
      })
    },

    entering() {
      let el = this.$el

      this.$emit('entering')

      setTimeout(() => {
        Object.assign(el.style, {
          'transform': ''
        })

        setTimeout(() => {
          this.afterEnter()
        }, this.time)
      }, 10)
    },

    afterEnter() {
      let el = this.$el

      Object.assign(el.style, {
        'transform-origin': '',
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      Object.assign(el.style, {
        'transform-origin': '50% 0',
        'transition': this.transition
      })

      this.$emit('beforeLeave')

      return this.leaveing()
    },

    leaveing() {
      let el = this.$el

      Object.assign(el.style, {
        'transform': 'scale(0)',
      })

      this.$emit('leaving')

      return this.afterLeave()
    },

    afterLeave() {
      let el = this.$el

      Object.assign(el.style, {
        'transform-origin': '',
        'transition': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', {
    }, this.$slots.default)
  }
}
