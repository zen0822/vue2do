/**
 * fold(折叠) transition component
 *
 * @event finish - 过渡完成
 */

import { addClass, delClass } from '../../util/dom/attr'
import baseMixin from './mixin'

export default {
  mixins: [baseMixin],

  computed: {
    transition() {
      return `height ${this.transitionTime} ease-out`
    }
  },

  methods: {
    beforeEnter() {
      debugger
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
      debugger
      let el = this.$el
      // HACK: 获取 offsetHeight 触发重绘，让 css3 过渡发生变化
      let height = el.firstChild ? el.firstChild.offsetHeight : 0

      el.style.height = `${height}px`

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter() {
      debugger
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

      Object.assign(el.style, {
        'transition': this.transition
      })

      return this.leaveing()
    },

    leaveing() {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        'height': el.scrollHeight + 'px',
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
        'transition': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  }
}
