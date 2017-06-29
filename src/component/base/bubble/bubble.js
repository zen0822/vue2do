/**
 * bubble 组件
 *
 * 注意要用自定义的 bubble 的时候，bubble的所有祖父元素都不能为相对定位
 * 如果bubble有祖父元素有相对定位的，请启用 props 的
 *
 * @prop theme - 主题
 * @prop width - bubble最大宽度
 * @prop message - bubble 信息
 * @prop display - 是否立即显示bubble
 * @prop relative - 是否启用相对位置的 bubble
 * @prop hideRightNow - 马上显示和隐藏 bubble，就是纯显示的 bubble 要启用
 *
 * @slot - 主体内容
 *
 */
import Vue from 'vue'

import './bubble.scss'
import iconComp from '../icon/icon'
import render from './bubble.render'
import baseMixin from '../../../mixin/base'
import bubbleTransition from '../../transition/bubble'

import { offset as childrenHeight } from '../../../util/dom/prop'

const ARROW_HEIGHT = 20

const bubbleComp = {
  name: 'bubble',

  render,

  mixins: [baseMixin],

  components: {
    icon: iconComp,
    'bubble-transition': bubbleTransition
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

    relative: {
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
    }
  },

  data() {
    this.compName = 'bubble'

    return {
      bubbleDisplay: false,
      mouseOnBubble: false,
      bubbleDisplayCounter: {},
      displayInterval: 800
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-bubble`
    }
  },

  methods: {
    _init() {
      if (this.hideRightNow) {
        this.displayInterval = 0
      }
    },
    _setDataOpt() {
      this.bubbleDisplay = this.display
    },
    /**
     * 初始化bubble位置
     * @return {Object} - 组件本身
     */
    _initPosition(target) {
      let $el = this.$el

      if ($el.style.display === 'none') {
        Object.assign($el.style, {
          visibility: 'hidden',
          display: ''
        })
      }

      let position = childrenHeight(target)

      let width = target.offsetWidth
      let height = target.offsetHeight

      let bubbleWidth = this.$el.offsetWidth
      let bubbleHeight = this.$el.offsetWidth

      Object.assign(this.$el.style, {
        top: position.top + height + ARROW_HEIGHT / 2 + 'px',
        left: position.left - bubbleWidth / 2 + width / 2 + 'px',
        display: 'none',
        visibility: ''
      })
    },

    /**
     * 显示bubble
     * @return {Functio} - 初始化bubble位置
     */
    show(target) {
      if (this.bubbleDisplay) {
        return this
      }

      clearTimeout(this.bubbleDisplayCounter)

      this._initPosition(target)

      this.$refs.transition.enter()

      this.$refs.transition.$on('entering', () => {
        this.bubbleDisplay = true
      })

      return this
    },

    /**
     * 隐藏bubble
     * @return {Object} - 组件本身
     */
    async hide() {
      clearTimeout(this.bubbleDisplayCounter)

      this.$refs.transition.$on('afterLeave', () => {
        this.bubbleDisplay = false
      })

      await this.$refs.transition.leave()

      return new Promise((resolve, reject) => {
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
    }
  }
}

export default bubbleComp
