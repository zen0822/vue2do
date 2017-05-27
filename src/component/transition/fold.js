import { addClass, delClass } from '../../util/dom/element'

/**
 * fold transition component
 *
 * @event finish - 过渡完成
 */

export default {
  render(h) {
    return h('transition', {
      on: {
        beforeEnter(el) {
          el.style.height = 0
        },

        enter(el) {
          // HACK: 获取 offsetHeight 触发重绘，让 css3 过渡发生变化
          let height = el.firstChild ? el.firstChild.offsetHeight : 0

          el.style.height = `${height}px`
        },

        afterEnter: this.afterTransition,

        beforeLeave(el) {
          el.style.height = el.scrollHeight + 'px'
        },

        leave(el) {
          if (el.scrollHeight !== 0) {
            el.style.height = 0
          }
        },

        afterLeave: this.afterTransition
      }
    }, this.$slots.default)
  },
  methods: {
    afterTransition(el) {
      el.style.height = ''

      this.$emit('finish')
    }
  }
}
