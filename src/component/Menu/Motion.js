/**
 * 展开菜单的动画
 *
 * @prop height - 被过渡的元素高度
 * @prop slideLength - 被过渡的元素向下滑动的距离
 *
 */

import {
  addClass,
  delClass
} from '../../util/dom/attr'

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
    this.moving = false // 是否正在执行过渡动画

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
      return new Promise(async(resolve, reject) => {
        try {
          this.$emit('beforeEnter')
          let el = this.$el

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
                'transition': ''
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
      let el = this.$el

      Object.assign(el.style, {
        height: 0,
        top: 0,
        overflow: 'hidden',
        opacity: 0.5,
        'transition': this.transition
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
        height: `${this.transitionHeight}px`,
        top: `${this.slideLength}px`,
        opacity: 1
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
        overflow: '',
        opacity: '',
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        height: `${this.transitionHeight}px`,
        top: `${this.slideLength}px`,
        opacity: 1,
        overflow: 'hidden'
      })

      Object.assign(el.style, {
        'transition': this.transition
      })

      return this.leaveing()
    },

    leaveing() {
      let el = this.$el
      let height = el.offsetHeight

      this.$emit('leaving')

      Object.assign(el.style, {
        height: 0,
        top: `${this.slideLength}px`,
        opacity: 0
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
        overflow: '',
        opacity: '',
        'transition': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  }
}
