/**
 * fold(折叠) transition component
 *
 * @prop height - 被过渡的元素高度
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
import transitionMixin from '../../mixin/transition'

export default {
  name: 'fold-transition',

  mixins: [baseMixin, transitionMixin],

  props: {
    height: Number
  },

  data() {
    return {
      transitionHeight: 0
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
      this.transitionHeight = this.height
    },

    _initComp() {
      if (this.height === undefined) {
        this.transitionHeight = elementProp(this.$el).offsetHeight
      }
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
        'height': 0,
        'overflow': 'hidden',
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

      el.style.height = `${this.transitionHeight}px`

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
        'height': '',
        'overflow': '',
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        height: `${this.transitionHeight}px`,
        'overflow': 'hidden'
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
        'height': 0
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
        'height': '',
        overflow: ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  }
}
