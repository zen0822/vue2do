/**
 * fold(折叠) transition component
 *
 * @prop height - 被过渡的元素高度
 *
 */

import { addClass, delClass } from '../../util/dom/attr'
import baseMixin from './mixin'

export default {
  mixins: [baseMixin],

  props: {
    height: Number
  },

  computed: {
    transition() {
      return `height ${this.transitionTime} ease-out`
    }
  },

  methods: {
    beforeEnter() {
      this.$emit('beforeEnter')
      let el = this.$el

      Object.assign(el.style, {
        'height': 0,
        'transition': this.transition
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

      el.style.height = `${this.height}px`

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
        'height': '',
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      el.style.height = `${this.height}px`

      Object.assign(el.style, {
        'transition': this.transition
      })

      return this.leaveing()
    },

    leaveing() {
      let el = this.$el
      let height = el.offsetHeight

      this.$emit('leaving')

      Object.assign(el.style, {
        'height': 0
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
        'height': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  }
}
