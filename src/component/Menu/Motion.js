/**
 * 展开菜单的动画
 *
 * @prop height - 被过渡的元素高度
 * @prop slideLength - 被过渡的元素向下滑动的距离
 *
 */

import {
  prop as elementProp
} from '../../util/dom/prop'

import baseMixin from '../../mixin/base'
import motionMixin from '../../mixin/motion'

export default {
  name: 'MotionMenuFold',

  mixins: [baseMixin, motionMixin],

  props: {
    height: Number,
    slideLength: Number
  },

  data() {
    return {
      transitionHeight: 0
    }
  },

  computed: {
    transition() {
      return `all ${this.transitionTime} ease-out`
    }
  },

  watch: {
    height(val) {
      return this.setHeight(val)
    }
  },

  methods: {
    _setDataOpt() {
      this.transitionHeight = this.height
    },

    _initComp() {
      if (this.height === undefined) {
        this.transitionHeight = elementProp(this.$el).offsetHeight
      }
    },

    /**
     * 重新调整菜单的动画
     */
    adjustMotion() {
      return new Promise((resolve, reject) => {
        try {
          this.$emit('beforeEnter')
          const el = this.$el

          Object.assign(el.style, {
            overflow: 'hidden',
            transition: this.transition
          })

          setTimeout(() => {
            Object.assign(el.style, {
              display: '',
              height: `${this.transitionHeight}px`,
              top: `${this.slideLength}px`
            })

            setTimeout(() => {
              Object.assign(el.style, {
                overflow: '',
                opacity: '',
                transition: ''
              })
            }, this.time)
          }, 10)

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },

    /**
     * 设置高度
     *
     * @param { Number }
     */
    setHeight(height) {
      this.transitionHeight = height
    },

    beforeEnter() {
      this.$emit('beforeEnter')
      const el = this.$el

      Object.assign(el.style, {
        height: 0,
        top: 0,
        overflow: 'hidden',
        opacity: 0.5,
        transition: this.transition
      })

      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            el.style.visibility = ''

            resolve()
          }, 10)
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

      Object.assign(el.style, {
        height: `${this.transitionHeight}px`,
        top: `${this.slideLength}px`,
        opacity: 1
      })

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
        overflow: '',
        opacity: '',
        transition: '',
        display: ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      const el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        height: `${this.transitionHeight}px`,
        opacity: 1,
        overflow: 'hidden'
      })

      Object.assign(el.style, {
        transition: this.transition
      })

      return this.leaveing()
    },

    leaveing() {
      const el = this.$el
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const height = el.offsetHeight

      this.$emit('leaving')

      Object.assign(el.style, {
        height: 0,
        opacity: 0
      })

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

    afterLeave() {
      const el = this.$el

      Object.assign(el.style, {
        overflow: '',
        opacity: '',
        transition: '',
        display: 'none',
        top: ''
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
