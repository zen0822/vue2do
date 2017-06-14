/**
 * rip(涟漪) transition component
 */

import { addClass, delClass } from '../../util/dom/element'
import baseMixin from '../../mixin/base'

export default {
  mixins: [baseMixin],

  render(h, context) {
    const data = {
      on: {
        beforeEnter: (el) => {
          addClass(el, this.prefixClass('g-rip'))
          el.style.transition = 'all 1.5s'
        },

        enter: (el) => {
        },

        afterEnter: (el) => {
          delClass(el, this.prefixClass('g-rip'))
          el.style.transition = ''

          this.$emit('afterEnter')
        },

        beforeLeave: (el) => {
        },

        leave: (el) => {
        },

        afterLeave: (el) => {
        }
      }
    }

    return h('transition', data, this.$slots.default)
  }
}
