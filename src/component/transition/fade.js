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
    beforeEnter() {
      this.$emit('beforeEnter')

      let el = this.$el

      Object.assign(el.style, {
        'transition': this.transition,
        'opacity': 0
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
            'opacity': this.opacity ? '' : 1
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
        'transition': '',
        'opacity': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        'transition': this.transition
      })

      if (!this.opacity) {
        el.style.opacity = 1
      }

      return this.leaveing()
    },

    leaveing() {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        'opacity': 0
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
        'transition': '',
        'opacity': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  }
}
