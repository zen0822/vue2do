/**
 * slide transition component - 滑动过度效果
 *
 * @prop speed - 淡出速度
 */

import baseMixin from './mixin'

export default {
  mixins: [baseMixin],

  props: {
    direction: {
      type: String,
      default: 'top'
    },
    detail: Object,
    position: Function
  },

  data() {
    return {
      transiting: false,
      isEnter: false,
      isLeaving: false
    }
  },

  computed: {
    translate() {
      return this._getTranslate()
    },
    transition() {
      return `transform ${this.transitionTime} ease-out`
    },
    // 过渡体的 bottom 值，就是过渡体底部离父元素底部的偏移值
    bottom() {
      return this.detail.parentHeight - this.detail.top - this.detail.height
    },
    // 过渡体的 right 值，就是过渡体右侧离父元素右侧的偏移值
    right() {
      return this.detail.parentWidth - this.detail.left - this.detail.width
    }
  },

  methods: {
    /**
     *
     * @param {Object} opt -
     *                      {Number} top
     *                      {Number} left
     * @return {String} - 过渡的样式声明
     *
     */
    _getTranslate({ top = this.detail.top, left = this.detail.left } = {}) {
      switch (this.direction) {
        case 'top':
          return `translateY(calc(-110% - ${top}px))`
        case 'bottom':
          return `translateY(calc(110% + ${this.bottom}px))`
        case 'left':
          return `translateX(calc(-110% - ${left}px))`
        case 'right':
          return `translateX(calc(110% + ${this.right}px))`
        default:
          return `translateY(calc(-110% - ${top}px))`
      }
    },

    beforeEnter() {
      this.$emit('beforeEnter')

      let el = this.$el
      let elPoi = this.position ? this.position() : {}

      Object.assign(el.style, {
        'transition': this.transition,
        'transform': this._getTranslate(elPoi),
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
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      this.$emit('entering')

      Object.assign(el.style, {
        'transform': ''
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter() {
      let el = this.$el

      Object.assign(el.style, {
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        'transition': this.transition,
        'transform': ''
      })

      return this.leaveing()
    },

    leaveing() {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        'transform': this.translate
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
        'transform': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  }
}
