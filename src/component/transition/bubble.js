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
        }, 10)
      })
    },

    entering() {
      let el = this.$el
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      Object.assign(el.style, {
        'transform': ''
      })

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
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

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        'transform': '',
        'transform-origin': '50% 0',
        'transition': this.transition
      })

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
          el.style.display = 'none'

          return resolve()
        }, this.time)
      })
    },

    afterLeave() {
      let el = this.$el

      Object.assign(el.style, {
        'transform': '',
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
