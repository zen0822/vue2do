/**
 * transition 组件的 mixin
 *
 * @prop display - 默认一开始是隐藏（进来之前的状态）
 * @prop speed - 动画速度
 * @prop sync - 调用多次动画时，动画与动画之间是否时同步
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
    display: {
      type: Boolean,
      default: false
    },
    speed: {
      type: [Number, String],
      default: 'normal',
      validator(val) {
        return ['normal', 'fast', 'slow'].includes(val)
      }
    },
    sync: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    time() {
      switch (this.speed) {
        case 'normal':
          return 300
        case 'fast':
          return 150
        case 'slow':
          return 450
        default:
          return 300
      }
    },
    transitionTime() {
      return this.time + 'ms'
    }
  },

  methods: {
    /**
     * 启动进来时的过渡动画
     *
     * @param {Object} opt
     */
    enter(opt = {}) {
      if (this.sync && this.transiting) {
        return false
      }

      return new Promise(async(resolve, reject) => {
        try {
          this.transiting = this.isEntering = true

          await this.beforeEnter(opt)
          await this.entering(opt)
          await this.afterEnter(opt)

          this.transiting = this.isEntering = false

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },

    /**
     * 启动离开时的过渡动画
     *
     * @param {Object} opt
     */
    leave(opt = {}) {
      if (this.sync && this.transiting) {
        return false
      }

      return new Promise(async(resolve, reject) => {
        try {
          this.transiting = this.isLeaving = true

          await this.beforeLeave(opt)
          await this.leaveing(opt)
          await this.afterLeave(opt)

          this.transiting = this.isLeaving = false

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },

    beforeEnter() {
      this.$el.style.display = ''

      return this.$emit('beforeEnter')
    },

    entering() {
      return this.$emit('entering')
    },

    afterEnter() {
      return this.$emit('afterEnter')
    },

    beforeLeave() {
      this.$el.style.display = 'none'

      return this.$emit('beforeLeave')
    },

    leaveing() {
      return this.$emit('leaveing')
    },

    afterLeave() {
      return this.$emit('afterLeave')
    }
  }
}
