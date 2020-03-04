/**
 * fold(折叠) motion component
 *
 * @prop height - 被过渡的元素高度
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
 *
 */

import {
  prop as elementProp
} from '../../util/dom/prop'

import baseMixin from '../../mixin/base'
import motionMixin from '../../mixin/motion'

export default {
  name: 'MotionFold',

  mixins: [baseMixin, motionMixin],

  props: {
    height: Number
  },

  data() {
    this.moving = false // 是否正在执行过渡动画

    return {
      motionHeight: 0
    }
  },

  computed: {
    transition() {
      return `height ${this.transitionTime} ease-out`
    }
  },

  watch: {
    height(val) {
      return this.setHeight(val)
    }
  },

  methods: {
    _setDataOpt() {
      this.motionHeight = this.height
    },

    _initComp() {
      if (this.height === undefined) {
        this.motionHeight = elementProp(this.$el).offsetHeight
      }
    },

    /**
     * 设置高度
     *
     * @param { Number }
     */
    setHeight(height) {
      this.motionHeight = height
    },

    beforeEnter({
      code
    } = {}) {
      this.$emit('beforeEnter')
      const el = this.$el

      Object.assign(el.style, {
        height: 0,
        overflow: 'hidden',
        transition: this.transition
      })

      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            code === this.code && (el.style.display = '')

            resolve()
          }, 218)
        } catch (error) {
          reject(error)
        }
      })
    },

    entering() {
      const el = this.$el
      // HACK: trigger browser reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const height = el.offsetHeight

      el.style.height = `${this.motionHeight}px`

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            resolve()
          }, this.time)
        } catch (error) {
          reject(error)
        }
      })
    },

    afterEnter() {
      const el = this.$el

      Object.assign(el.style, {
        height: '',
        overflow: '',
        transition: ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      const el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        height: `${this.motionHeight}px`,
        overflow: 'hidden',
        transition: this.transition
      })

      return this.leaveing()
    },

    leaveing({
      code
    } = {}) {
      const el = this.$el
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const height = el.offsetHeight

      this.$emit('leaving')

      Object.assign(el.style, {
        height: 0
      })

      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            code === this.code && (el.style.display = 'none')

            return resolve()
          }, this.time)
        } catch (error) {
          reject(error)
        }
      })
    },

    afterLeave() {
      const el = this.$el

      Object.assign(el.style, {
        transition: '',
        height: '',
        overflow: ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
