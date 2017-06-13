/**
 * rip(涟漪) transition component
 */

export default {
  functional: true,
  render(h, { children, props }) {
    const data = {
      on: {
        beforeEnter(el) {
          el.style.height = 0
        },

        enter(el) {
          el.style.height = `${el.firstChild.offsetHeight}px`
        },

        afterEnter(el) {
          el.style.height = ''
        },

        beforeLeave(el) {
          el.style.height = el.scrollHeight + 'px'
        },

        leave(el) {
          if (el.scrollHeight !== 0) {
            el.style.height = 0
          }
        },

        afterLeave(el) {
          el.style.height = ''
        }
      }
    }

    return h('transition', data, children)
  }
}
