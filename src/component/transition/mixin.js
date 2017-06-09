/**
 * transition 组件的 mixin
 *
 * @prop speed - 动画速度
 *
 * @event beforeEnter - 进来过渡之前
 * @event enter - 进来过渡期间
 * @event afterEnter - 进来过渡完成
 * @event beforeLeave - 离开过渡之前
 * @event leave - 离开过渡期间
 * @event afterLeave - 离开过渡之后
 */

export default {
  props: {
    speed: {
      type: [Number, String],
      default: 'normal'
    }
  },

  computed: {
    transitionTime() {
      switch (this.speed) {
        case 'normal':
          return '300ms'
        case 'fast':
          return '150ms'
        case 'slow':
          return '450ms'
        default:
          return '300ms'
      }
    }
  }
}