/**
 * rip(涟漪) transition component
 *
 * @prop assign - 指定涟漪在是什么位置开始
 */

import { addClass, delClass } from '../../util/dom/attr'

import baseMixin from '../../mixin/base'
import transitionMixin from '../../mixin/transition'

import './TransitionRip.scss'

export default {
  name: 'rip-transition',

  mixins: [baseMixin, transitionMixin],

  props: {
    assign: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    beforeEnter({ mousePoi } = {}) {
      this.$emit('beforeEnter')

      let el = this.$el

      addClass(el, this.prefix('transition-rip-comp'))

      if (this.assign) {
        addClass(el, this.prefix('transition-rip-assign'))

        let $spot = el.firstChild

        Object.assign(el.style, {
          'visibility': 'hidden',
          'display': ''
        })

        let spotComputedStyle = getComputedStyle($spot)
        let spotW = parseFloat(spotComputedStyle.width)
        let spotH = parseFloat(spotComputedStyle.height)

        Object.assign(el.style, {
          'visibility': '',
          'display': 'none'
        })

        $spot.style.top = (mousePoi.y - spotH / 2) + 'px'
        $spot.style.left = (mousePoi.x - spotW / 2) + 'px'
      }

      // HACK: trigger browser reflow
      let height = el.offsetHeight
      el.firstChild.style.transition = el.style.transition = 'all 800ms'

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          el.style.display = ''

          return resolve()
        })
      })
    },

    entering(opt = {}) {
      let el = this.$el
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      this.$emit('entering')

      addClass(el, this.prefix('transition-rip-active'))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter(opt = {}) {
      let el = this.$el

      el.firstChild.style.transition = el.style.transition = ''

      delClass(el, [
        this.prefix('transition-rip-comp'),
        this.prefix('transition-rip-assign'),
        this.prefix('transition-rip-active')
      ])

      this.$emit('afterEnter')

      return this.leave()
    }
  },

  render(h, context) {
    return h('transition',
      [
        h('div',
          {
            class: [this.prefix('transition-rip')]
          },
          [h('div', { class: [this.prefix('transition-rip-spot')] })]
        )
      ]
    )
  }
}
