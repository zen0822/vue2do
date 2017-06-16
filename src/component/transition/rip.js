/**
 * rip(涟漪) transition component
 *
 * @prop assign - 指定涟漪在是什么位置开始
 */

import { addClass, delClass } from '../../util/dom/element'
import baseMixin from '../../mixin/base'
import './scss/rip.scss'

export default {
  mixins: [baseMixin],

  props: {
    assign: {
      type: Boolean,
      default: false
    },
    mousePoi: Object,
    switch: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      show: false
    }
  },

  watch: {
    switch(val) {
      this.show = val
    }
  },

  methods: {
    _setDataOpt() {
      this.show = this.switch
    }
  },

  render(h, context) {
    const data = {
      on: {
        beforeEnter: (el) => {
          addClass(el, this.prefixClass('transition-rip'))

          if (this.assign) {
            let $spot = el.firstChild

            el.style.visibility = 'hidden'
            el.style.display = ''

            let spotComputedStyle = getComputedStyle($spot)
            let spotW = parseFloat(spotComputedStyle.width)
            let spotH = parseFloat(spotComputedStyle.height)

            el.style.visibility = ''
            el.style.display = 'none'
            $spot.style.top = (this.mousePoi.y - spotH / 2) + 'px'
            $spot.style.left = (this.mousePoi.x - spotW / 2) + 'px'
          } else {
            addClass(el, this.prefixClass('transition-rip-auto'))
          }

          let height = el.offsetHeight

          el.firstChild.style.transition = el.style.transition = 'all 500ms'

          this.$emit('beforeEnter', { el })
        },

        enter: (el) => {
          let height = el.offsetHeight

          addClass(el, this.prefixClass('transition-rip-active'))

          this.$emit('enter')
        },

        afterEnter: (el) => {
          el.firstChild.style.transition = el.style.transition = ''

          delClass(el, [
            this.prefixClass('transition-rip'),
            this.prefixClass('transition-rip-active')
          ])

          this.$emit('afterEnter')
        }
      }
    }

    return h('transition',
      data,
      [
        h('div',
          {
            directives: [{
              name: 'show',
              value: this.show
            }]
          },
          [h('div', { class: [this.prefixClass('transition-rip-spot')] })]
        )
      ]
    )
  }
}
