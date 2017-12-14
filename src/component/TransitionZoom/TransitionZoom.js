/**
 * zoom transition component - 放大缩小效果
 *
 * @prop speed - 淡出速度
 * @prop origin - 放大缩小的起始位置 (同 css 里的属性 transform-origin)
 * @prop global - 元素的位置是否是以可视界面的相对定位 (fixed)，默认为否（绝对定位 absolute）
 */

import baseMixin from '../../mixin/transition'

export default {
  name: 'zoom-transition',

  mixins: [baseMixin],

  props: {
    global: {
      type: Boolean,
      default: false
    },
    origin: {
      type: String,
      default: '50% 50%'
    }
  },

  data() {
    this.transiting = false // 是否正则执行过渡动画

    return {}
  },

  computed: {
    positionType() {
      return this.global ? 'fixed' : 'absolute'
    },
    transition() {
      return `transform ${this.transitionTime} ease-out`
    }
  },

  methods: {
    beforeEnter() {
      this.$emit('beforeEnter')
      let el = this.$el

      Object.assign(el.style, {
        'position': this.positionType,
        'transform-origin': this.origin,
        'transition': this.transition,
        'transform': 'scale(0)'
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
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      Object.assign(el.style, {
        'transform': ''
      })

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
        'position': '',
        'transform-origin': '',
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        'position': this.positionType,
        'transform': '',
        'transform-origin': this.origin,
        'transition': this.transition
      })

      return this.leaveing()
    },

    leaveing() {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        'transform': 'scale(0)'
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
        'position': '',
        'transform': '',
        'transform-origin': '',
        'transition': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', {}, this.$slots.default)
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
