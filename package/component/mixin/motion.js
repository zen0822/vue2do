/**
 * motion 组件的 mixin
 *
 * @prop display - 默认一开始是隐藏（进来之前的状态）
 * @prop speed - 动画速度
 * @prop sync - 当处于进来动画，再次调用进来动画是否执行，同离开动画
 * @prop once - 当处于进来的状态时不可以再触发进来的动画，同离开动画
 *
 * @event beforeEnter - 进来过渡之前
 * @event enter - 进来过渡期间
 * @event afterEnter - 进来过渡完成
 * @event beforeLeave - 离开过渡之前
 * @event leave - 离开过渡期间
 * @event afterLeave - 离开过渡之后
 */

import uid from '../util/uid'

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
        return ['normal', 'fast', 'slow'].includes(val) || typeof val === 'number'
      }
    },
    sync: {
      type: Boolean,
      default: false
    },
    once: {
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
          return this.speed
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
      if (this.once && this.isEntering) {
        return false
      }

      this.isEntering = true
      this.isLeaving = false

      if (this.sync && this.moving) {
        return false
      }

      this.code = uid()
      const code = this.code
      opt = { ...opt,
        code
      }

      return new Promise(async (resolve, reject) => {
        try {
          this.moving = true

          code === this.code && await this.beforeEnter(opt)
          code === this.code && await this.entering(opt)
          code === this.code && await this.afterEnter(opt)

          this.moving = false

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
      if (this.once && this.isLeaving) {
        return false
      }

      this.isEntering = false
      this.isLeaving = true

      if (this.sync && this.moving) {
        return false
      }

      this.code = uid()
      const code = this.code
      opt = { ...opt,
        code
      }

      return new Promise(async (resolve, reject) => {
        try {
          this.moving = true

          code === this.code && await this.beforeLeave(opt)
          code === this.code && await this.leaveing(opt)
          code === this.code && await this.afterLeave(opt)

          this.moving = false

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
  },

  created() {
    this.moving = false // 当前正在执行动画
    this.isEntering = this.display // 当前执行进来的动画的编号
    this.isLeaving = !this.display // 当前执行离开的动画的编号
    this.code = 0 // 当前执行的动画的编号
  }
}
