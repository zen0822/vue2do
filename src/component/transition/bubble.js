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
      let el = this.$el

      Object.assign(el.style, {
        'transform-origin': '50% 0',
        'transition': this.transition,
        'transform': 'scale(0)',
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          el.style.display = ''

          return resolve()
        })
      })
    },

    entering() {
      let el = this.$el

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Object.assign(el.style, {
            'transform': ''
          })

          setTimeout(() => {
            return resolve()
          }, this.time)
        }, 10)
      })
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

      this.$emit('leaving')

      Object.assign(el.style, {
        'transform': 'scale(0)',
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, 50)
      })
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
