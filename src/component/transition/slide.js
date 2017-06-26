/**
 * slide transition component
 *
 * @prop direction - 弹出方向（left | right | top | bottom）
 * @prop speed - 弹出速度
 * @prop type - 弹出类型
 * @prop detail - 组件信息(top | left | width | height | parentW | parentH)
 * @prop position - 进来过渡之前回调函数（返回相关信息）
 *
 * @event beforeEnter - 进来过渡之前
 * @event enter - 进来过渡期间
 * @event afterEnter - 进来过渡完成
 * @event beforeLeave - 离开过渡之前
 * @event leave - 离开过渡期间
 * @event afterLeave - 离开过渡之后
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

  computed: {
    translate() {
      return this.getTranslate({
        top: this.top,
        left: this.left
      })
    },
    transition() {
      return `transform ${this.transitionTime} ease-out`
    }
  },

  methods: {
    getTranslate({ top = this.detail.top, left = this.detail.left } = {}) {
      switch (this.direction) {
        case 'top':
          return `translateY(calc(-200% - ${top}px))`
        case 'bottom':
          return `translateY(calc(200% + ${top}px))`
        case 'left':
          return `translateX(calc(-200% - ${left}px))`
        case 'right':
          return `translateX(calc(200% + ${left}px))`
        default:
          return `translateY(calc(-200% - ${top}px))`
      }
    }
  },

  render(h) {
    return h('transition', {
      on: {
        beforeEnter: (el) => {
          let elPoi = this.position ? this.position() : {}

          el.style.visibility = 'hidden'
          el.style.display = ''
          el.style.transform = this.getTranslate(elPoi)

          return this.$emit('beforeEnter')
        },

        enter: (el) => {
          // HACK: 触发重绘
          let height = this.$el.offsetHeight

          el.style.transition = this.transition
          el.style.visibility = ''
          el.style.transform = ''

          return this.$emit('enter')
        },

        afterEnter: (el) => {
          el.style.transition = ''

          return this.$emit('afterEnter')
        },

        beforeLeave: (el) => {
          el.style.transform = ''
          el.style.transition = this.transition

          return this.$emit('beforeLeave')
        },

        leave: (el) => {
          el.style.visibility = ''
          el.style.transform = this.translate

          return this.$emit('leave')
        },

        afterLeave: (el) => {
          el.style.transition = ''
          el.style.transform = ''

          return this.$emit('afterLeave')
        }
      }
    }, this.$slots.default)
  }
}
