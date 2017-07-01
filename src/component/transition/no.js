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

  methods: {
    async enter() {
      await this.beforeEnter()
      await this.entering()
      await this.afterEnter()

      return new Promise((resolve, reject) => {
        return resolve()
      })
    },

    async leave() {
      await this.beforeLeave()
      await this.leaveing()
      await this.afterLeave()

      return new Promise((resolve, reject) => {
        return resolve()
      })
    },

    beforeEnter() {
      this.$emit('beforeEnter')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        })
      })
    },

    entering() {
      this.$emit('entering')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setTimeout(() => {
            return resolve()
          }, this.time)
        }, 10)
      })
    },

    afterEnter() {
      this.$emit('afterEnter')
    },

    beforeLeave() {
      this.$emit('beforeLeave')

      return this.leaveing()
    },

    leaveing() {
      this.$emit('leaving')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterLeave() {
      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  }
}
