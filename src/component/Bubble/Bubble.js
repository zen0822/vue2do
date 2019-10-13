/**
 * bubble 组件
 *
 * 注意要用自定义的 bubble 的时候，bubble的所有祖父元素都不能为相对定位
 * 如果bubble有祖父元素有相对定位的，请启用 props 的 fix
 *
 * @prop width - bubble最大宽度
 * @prop target - 目标的 dom 元素
 * @prop message - bubble 信息
 * @prop display - 是否立即显示bubble
 * @prop fixed - 是否启用基于 window 的相对位置的 bubble
 * @prop hideRightNow - 马上显示和隐藏 bubble，就是纯显示的 bubble 要启用
 *
 * @slot - 主体内容
 */

import './Bubble.scss'
import Icon from '../Icon/Icon'
import render from './Bubble.render'
import baseMixin from '../../mixin/base'
import MotionZoom from '../MotionZoom/MotionZoom'

import {
  offset as childrenHeight
} from '../../util/dom/prop'

const ARROW_HEIGHT = 20

export default {
  name: 'Bubble',

  render,

  mixins: [baseMixin],

  components: {
    icon: Icon,
    'zoom-transition': MotionZoom
  },

  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    message: {
      type: String,
      default: ''
    },
    display: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    hideRightNow: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    target: {
      type: Object,
      default: null
    }
  },

  data() {
    this.compName = 'bubble'
    this.bubbleDisplay = false
    this.targetDetail = {} // 目标的信息

    return {
      stateMessage: this.message,
      stateTarget: this.target,
      mouseOnBubble: false,
      bubbleDisplayCounter: {},
      displayInterval: 800
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-bubble`
    },
    compClass() {
      const className = [
        this.cPrefix,
        this.xclass(this.themeClass),
        {
          [this.xclass('custom')]: !this.stateMessage,
          [this.xclass('fixed')]: this.fixed
        }
      ]

      return className.join(' ')
    }
  },

  methods: {
    _initComp() {
      if (this.hideRightNow) {
        this.displayInterval = 0
      }

      this.initPoiInterval = setInterval(() => {
        this.bubbleDisplay && this._initPosition()
      }, 100)
    },

    _binder() {
      this.$refs.transition.$on('afterLeave', () => {
        this.bubbleDisplay = false
      })

      this.$refs.transition.$on('afterEnter', () => {
        this.bubbleDisplay = true
      })
    },

    _setDataOpt() {
      this.bubbleDisplay = this.display
    },

    /**
     * 初始化bubble位置
     *
     * @return {Object} - 组件本身
     */
    _initPosition(target = this.stateTarget) {
      if (!target) {
        return false
      }

      if (target.nodeType !== 1) {
        console.warn(`Vue2do: props target is not a dom element on bubble component.`)

        return false
      }

      const $el = this.$el
      const hide = getComputedStyle($el).display === 'none'

      if (hide) {
        Object.assign($el.style, {
          visibility: 'hidden',
          display: ''
        })
      }

      const position = childrenHeight(target)

      const width = target.offsetWidth
      const height = target.offsetHeight

      if (this.targetDetail.top === position.top &&
        this.targetDetail.left === position.left &&
        this.targetDetail.width === width &&
        this.targetDetail.height === height
      ) {
        if (hide) {
          Object.assign($el.style, {
            display: 'none',
            visibility: ''
          })
        }

        return false
      }

      this.targetDetail = {
        top: position.top,
        left: position.left,
        width,
        height
      }

      const bubbleWidth = this.$el.offsetWidth

      Object.assign(this.$el.style, {
        top: position.top + height + ARROW_HEIGHT / 2 + 'px',
        left: position.left - bubbleWidth / 2 + width / 2 + 'px'
      })

      if (hide) {
        Object.assign($el.style, {
          display: 'none',
          visibility: ''
        })
      }
    },

    /**
     * 显示bubble
     * @return {Functio} - 初始化bubble位置
     */
    async show() {
      if (this.bubbleDisplay) {
        return this
      }

      clearTimeout(this.bubbleDisplayCounter)

      await this.$nextTick(() => {
        this._initPosition()

        this.$refs.transition.enter()
      })

      return this
    },

    /**
     * 隐藏bubble
     * @return {Object} - 组件本身
     */
    async hide() {
      clearTimeout(this.bubbleDisplayCounter)

      await this.$refs.transition.leave()

      return new Promise((resolve) => {
        return resolve()
      })
    },

    /**
     * 获取bubble的信息
     * @return {Object, String}
     **/
    info(text) {
      if (text !== undefined) {
        this.message = text

        return this
      }

      return this.message
    },

    /**
     * 鼠标在bubble上面触发的函数
     **/
    mouseOver() {
      this.mouseOnBubble = true
      clearTimeout(this.bubbleDisplayCounter)
    },

    /**
     * 鼠标离开bubble触发的函数
     **/
    mouseLeave() {
      this.mouseOnBubble = false
      this.setTimeoutBubbleDisplay()
    },

    /**
     * 点击
     */
    click(event) {
      return event.stopPropagation()
    },

    /**
     * 延迟隐藏
     **/
    delayHide() {
      this.bubbleDisplayCounter = setTimeout(() => {
        this.hide()
      }, this.displayInterval)
    },

    /**
     * 设置相关的属性
     */
    set({
      message,
      target
    } = {}) {
      this.stateMessage = message
      this.stateTarget = target

      return this
    }
  },

  destroyed() {
    clearInterval(this.initPoiInterval)
  }
}
