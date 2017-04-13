import { addClass, delClass } from '../../util/dom/element'

/**
 * fold transition component
 */

const Transition = {
  beforeEnter(el) {
    el.style.height = 0
  },

  enter(el) {
    let height = el.firstChild ? el.firstChild.offsetHeight : 0

    el.style.height = `${height}px`
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

export default {
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition
    }

    return h('transition', data, children)
  }
}
