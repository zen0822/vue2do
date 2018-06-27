/**
 * rip(涟漪) motion component
 *
 * @prop assign - 指定涟漪在是什么位置开始
 * @prop circle - 涟漪是圆形
 * @prop radius - 涟漪半径大小 (S | M | L)
 * @prop overflow - 默认溢出不隐藏，true 为隐藏溢出的 spot
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

import {
  addClass,
  delClass
} from '../../util/dom/attr'

import baseMixin from '../../mixin/base'
import motionMixin from '../../mixin/motion'

import './MotionRip.scss'

export default {
  name: 'MotionRip',

  mixins: [baseMixin, motionMixin],

  props: {
    assign: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    radius: {
      type: [String],
      default: 'S',
      validator(val) {
        return ['s', 'm', 'l'].includes(val.toLowerCase()) || /(%|px)$/.test(val)
      }
    },
    overflow: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    time() {
      switch (this.speed) {
        case 'normal':
          return 800
        case 'fast':
          return 600
        case 'slow':
          return 1000
        default:
          return this.speed
      }
    },
    ripPadding() {
      switch (this.radius.toLowerCase()) {
        case 's':
          return '80%'
        case 'm':
          return '100%'
        case 'l':
          return '120%'
        default:
          return this.radius
      }
    }
  },

  methods: {
    beforeEnter({
      mousePoi,
      code
    } = {}) {
      this.$emit('beforeEnter')

      let el = this.$el

      Object.assign(el.style, {
        'display': 'none'
      })

      delClass(el, [
        this.prefix('motion-rip-assign'),
        this.prefix('motion-rip-active')
      ])

      addClass(el, this.prefix('motion-rip-comp'))

      if (this.assign) {
        addClass(el, this.prefix('motion-rip-assign'))

        let $spot = el.firstChild

        Object.assign(el.style, {
          'visibility': 'hidden',
          'display': ''
        })

        let spotComputedStyle = getComputedStyle($spot)
        let spotW = parseFloat(spotComputedStyle.width)
        let spotH = parseFloat(spotComputedStyle.height)

        Object.assign(el.style, {
          'visibility': '',
          'display': 'none'
        })

        $spot.style.top = (mousePoi.y - spotH / 2) + 'px'
        $spot.style.left = (mousePoi.x - spotW / 2) + 'px'
      }

      // HACK: trigger browser reflow
      let height = el.offsetHeight
      el.firstChild.style.transition = el.style.transition = `all ${this.time}ms`

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          code === this.code && (el.style.display = '')

          return resolve()
        })
      })
    },

    entering(opt = {}) {
      let el = this.$el
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      this.$emit('entering')

      addClass(el, this.prefix('motion-rip-active'))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter(opt = {}) {
      let el = this.$el

      el.firstChild.style.transition = el.style.transition = ''
      el.style.display = ''

      delClass(el, [
        this.prefix('motion-rip-comp'),
        this.prefix('motion-rip-assign'),
        this.prefix('motion-rip-active')
      ])

      this.$emit('afterEnter')

      return this.leave()
    }
  },

  render(h, context) {
    return h('transition', [
      h('div', {
        class: [
          this.prefix('motion-rip'),
          {
            [this.prefix('motion-rip-circle')]: this.circle
          },
          {
            [this.prefix('motion-rip-overflow')]: this.overflow
          }
        ]
      }, [h('div', {
        class: [this.prefix('motion-rip-spot')],
        style: {
          padding: this.ripPadding
        }
      })])
    ])
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
