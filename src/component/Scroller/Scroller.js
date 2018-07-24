/**
 * scroller 组件 滚动条
 *
 * @prop height - 滚动区域的高度(auto | { Number }px | 100% })，
 *                auto：根据滚动内容的高度
 *                { Number }：自定义像素高度
 *                100%：根据父元素的高度
 * @prop width - 滚动区域的宽度(auto | {Number}px | 100%)，同上
 * @prop autoHide - 自动隐藏滚动条
 * @prop hide - 隐藏滚动条
 *
 * @event scrollY - 滚动事件
 *                  return isBottom - 滚动条是否到低
 *                         isTop - 滚动条是否到顶
 *                         top - 滚动条到滚动区域的顶部的当前距离
 *                         offset - 滚动条离滚动区域的顶部的距离
 * @event scrollX - 滚动事件
 *                  return isRight - 滚动条是否到结束的地方
 *                         isLeft - 滚动条是否到开始的地方
 *                         left - 滚动条到滚动区域的最左边的当前距离
 *                         offset - 滚动条离滚动区域的顶部的距离
 * @event yBarChange - y-bar 滚动条改变
 *                  return isBottom - 滚动条是否到低
 *                         isTop - 滚动条是否到顶
 *                         top - 滚动条到滚动区域的顶部的当前距离
 *                         offset - 滚动条离滚动区域的顶部的距离
 * @event xBarChange - x-bar 滚动条改变
 *                  return isRight - 滚动条是否到结束的地方
 *                         isLeft - 滚动条是否到开始的地方
 *                         left - 滚动条到滚动区域的最左边的当前距离
 *                         offset - 滚动条离滚动区域的顶部的距离
 * @event change - 滚动区域的高度/宽度变化
 */

import './Scroller.scss'

import baseMixin from '../../mixin/base'
import apiMixin from './Scroller.api'
import render from './Scroller.render.js'
import keyCode from '../../config/keyCode.json'

import {
  offset as propOffset
} from '../../util/dom/prop'

import MotionFade from '../MotionFade/MotionFade'

// 滚动一次的滚动区域走的像素大小
const SCROLL_PIXEL = 10

export default {
  name: 'Scroller',

  mixins: [baseMixin, apiMixin],

  render,

  components: {
    'motion-fade': MotionFade
  },

  props: {
    height: {
      type: [Number, String],
      default: 'auto',
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val === 'auto' || val === '100%') {
          return true
        } else {
          return false
        }
      }
    },
    width: {
      type: [Number, String],
      default: 'auto',
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val === 'auto' || val === '100%') {
          return true
        } else {
          return false
        }
      }
    },
    autoHide: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: false
    }
  },

  data() {
    this.compName = 'scroller' // 组件名字
    this.interValInitScroller = '' // 初始化滚动条定时器

    return {
      yData: { // y-scroller detail
        barAndScrollerOffset: 0, // 滚动条和滚动区域的偏移值
        barLength: 0, // 滚动条的高度
        barTop: 0, // bar 的高度
        boxBarRate: 0, // 滚动内容 / 滚动条区域
        boxAndScrollerOffset: 0, // 滚动内容和滚动区域的偏移值
        isMousedown: false, // 滚动条的 mousedown 事件
        oldBarTop: 0, // 记录上一次滚动条的高度
        scrollBarPixel: 0, // 滚动一次的滚动条走的像素大小
        scrollerContainBox: false // 滚动条的高度是否大于滚动区域
      },

      xData: { // x-scroller detail
        barLength: 0,
        barLeft: 0,
        barAndScrollerOffset: 0,
        boxBarRate: 0,
        boxAndScrollerOffset: 0,
        isMousedown: false,
        oldBarLeft: 0,
        scrollBarPixel: 0,
        scrollerContainBox: false
      },

      boxTop: 0, // box 离最顶端的偏移值
      boxLeft: 0, // box 离最开始的偏移值
      boxHeight: 0, // 滚动内容的高度
      boxWidth: 0, // 滚动内容的宽度
      boxStyleHeight: 0, // 滚动内容的样式高度
      boxStyleWidth: 0, // 滚动内容的样式宽度
      scrollerHeight: 0, // 滚动区域的高度
      scrollerWidth: 0, // 滚动区域的宽度
      parentHeight: 0, // 滚动区域的父元素的高度
      parentWidth: 0, // 滚动区域的父元素的宽度
      showBar: false, // 滚动条自动隐藏的状态
      isTouchStart: false, // 滚动区域的 touchend 事件
      scrolling: false, // 记录连续滚动的标注
      moving: false, // 记录是否还在触摸移动中
      hasScrollerGrandpa: false, // 是否有 scroller 组件的祖先

      touchStart: { // 记录开始触摸滚动区域的坐标
        x: 0,
        y: 0
      },

      pointStart: { // 记录开始点击滚动条的坐标
        x: 0,
        y: 0
      }
    }
  },

  computed: {
    boxStyle() {
      return {
        transform: `translateX(${this.boxLeft}px) translateY(${this.boxTop}px)`
      }
    },
    xComputed() { // x 方向的计算属性
      return {
        barDisplay: !this.hide && !this.xData.scrollerContainBox && (!this.autoHide || this.showBar),
        isLeft: this.xData.barLeft === 0,
        isRight: this.xData.barLeft === this.xData.barAndScrollerOffset,
        barStyle: {
          width: this.xData.barLength + 'px',
          transform: `translateX(${this.xData.barLeft}px)`
        }
      }
    },
    yComputed() { // y 方向的计算属性
      return {
        // 是否显示滚动条
        barDisplay: !this.hide && !this.yData.scrollerContainBox && (!this.autoHide || this.showBar),
        // 滚动条是否在顶部
        isTop: this.yData.scrollerContainBox || this.yData.barTop === 0,
        // 滚动条是否在底部
        isBottom: this.yData.scrollerContainBox || this.yData.barTop === this.yData.barAndScrollerOffset,
        barStyle: {
          height: this.yData.barLength + 'px',
          transform: `translateY(${this.yData.barTop}px)`
        }
      }
    },
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-scroller`
    }
  },

  watch: {
    barTop(val) {
      this.triggerScroll('y')
    },
    barLeft(val) {
      this.triggerScroll('x')
    },
    yComputed(val) {
      const refBar = this.$refs.bar

      if (val.barDisplay && !refBar.isEntering) {
        refBar.enter()
      } else if (!val.barDisplay && !refBar.isLeaving) {
        refBar.leave()
      }
    }
  },

  methods: {
    _initComp() {
      this.$box = this.$refs.box
      this._initScroller()

      this.interValInitScroller = setInterval(() => {
        this._initScroller()
      }, 50)
    },

    _binder() {
      document.addEventListener('mousemove', this.scrollerMouseMove)
      document.addEventListener('mouseup', this.scrollerMouseUp)
    },

    /**
     * '1.435px' => 1.44
     */
    _getNumFromStr(str) {
      return Math.round(parseFloat(str))
    },

    // 初始化滚动条
    _initScroller() {
      const $elParent = this.$el.parentElement
      const parentStyle = getComputedStyle($elParent)

      // 根据父元素的高宽都等于 auto 可以断言出元素的祖父元素有可能是隐藏的
      if (parentStyle.width === 'auto' && parentStyle.height === 'auto') {
        return false
      }

      let scrollerHeight = this.$el.offsetHeight
      let scrollerWidth = this.$el.offsetWidth
      let boxHeight = this.$box.offsetHeight
      let boxWidth = this.$box.offsetWidth

      const yData = this._initScrollerData({
        length: this.height,
        boxLength: boxHeight,
        scrollerLength: scrollerHeight,
        type: 'y'
      })

      const xData = this._initScrollerData({
        length: this.width,
        scrollerLength: scrollerWidth,
        boxLength: boxWidth,
        type: 'x'
      })

      scrollerHeight = yData.scrollerLength
      scrollerWidth = xData.scrollerLength
      boxHeight = yData.boxLength
      boxWidth = xData.boxLength

      const scrollerHeightChanged = scrollerHeight !== this.scrollerHeight
      const scrollerWidthChanged = scrollerWidth !== this.scrollerWidth
      const boxHeightChanged = boxHeight !== this.boxHeight
      const boxWidthChanged = boxWidth !== this.boxWidth

      if (scrollerHeightChanged || boxHeightChanged) {
        this._initScrollBar({
          type: 'y',
          scrollerLength: scrollerHeight,
          scrollerContainBox: yData.scrollerContainBox,
          boxLength: boxHeight
        })
      }

      if (scrollerWidthChanged || boxWidthChanged) {
        this._initScrollBar({
          type: 'x',
          scrollerLength: scrollerWidth,
          scrollerContainBox: xData.scrollerContainBox,
          boxLength: boxWidth
        })
      }

      this.scrollerHeight = scrollerHeight
      this.scrollerWidth = scrollerWidth
      this.boxHeight = boxHeight
      this.boxWidth = boxWidth

      if (this.height === '100%') {
        this.$el.style.height = '100%'
      } else if (this.height !== '100%' && scrollerHeightChanged) {
        this.$el.style.height = `${this.scrollerHeight}px`
      }

      if (this.width === '100%') {
        this.$el.style.width = '100%'
      } else if (this.width !== '100%' && scrollerWidthChanged) {
        this.$el.style.width = `${this.scrollerWidth}px`
      }

      if (scrollerHeightChanged || scrollerWidthChanged) {
        this._scrollerChange()
      }
    },

    /**
     * 初始化滚动区域的数据
     * @param { Object } - 选项数据
     *                   type - 滚动条类型
     *                   scrollerLength - 滚动的 高度/宽度
     *                   boxLength - 滚动内容的 高度/宽度
     *                   length - 指定的滚动区域的 高度/宽度
     */
    _initScrollerData({
      type,
      boxLength,
      scrollerLength,
      length
    }) {
      const $el = this.$el
      let scrollerContainBox = false // 滚动区域是否大过滚动内容
      let barPositionName = `bar${type === 'y' ? 'Top' : 'Left'}` // 滚动条位置名字
      let boxPositionName = `box${type === 'y' ? 'Top' : 'Left'}` // 滚动内容位置名字

      if (length === '100%') {
        // 父元素大于滚动内容
        if (scrollerLength >= boxLength) {
          boxLength = scrollerLength
        }

        scrollerContainBox = scrollerLength === boxLength
      } else if (length === 'auto') {
        scrollerContainBox = true
        scrollerLength = boxLength
      } else {
        scrollerContainBox = length >= boxLength
        scrollerLength = scrollerContainBox ? boxLength : length
      }

      if (scrollerContainBox) {
        this[boxPositionName] = 0
        this[barPositionName] = 0
      }

      return {
        scrollerLength,
        scrollerContainBox,
        boxLength
      }
    },

    /**
     * 初始化滚动条的数据
     * @param { Object } - 选项数据
     *                   type - 滚动条类型
     *                   boxLength - 滚动内容的高度/宽度
     *                   scrollerLength - 滚动区域的高度/宽度
     *                   scrollerContainBox - 滚动区域是否大过滚动内容
     */
    _initScrollBar({
      type,
      boxLength,
      scrollerLength,
      scrollerContainBox
    }) {
      let barName = type + 'Data' // 滚动条数据的名字
      let boxBarRate = 0 // 滚动内容和滚动条的比
      let barLength = 0 // 滚动条的长度
      let boxAndScrollerOffset = 0 // 滚动内容和滚动区域的偏移值
      let barAndScrollerOffset = 0 // 滚动条和滚动区域的偏移值
      let barPositionName = `bar${type === 'y' ? 'Top' : 'Left'}` // 滚动条位置名字
      let boxPositionName = `box${type === 'y' ? 'Top' : 'Left'}` // 滚动内容位置名字

      boxBarRate = boxLength / scrollerLength
      barLength = scrollerLength / boxBarRate

      boxAndScrollerOffset = boxLength - scrollerLength
      barAndScrollerOffset = scrollerLength - barLength

      this[barName].scrollerContainBox = scrollerContainBox
      this[barName].boxBarRate = boxBarRate
      this[barName].barLength = barLength
      this[barName].scrollBarPixel = SCROLL_PIXEL / boxBarRate
      this[barName].boxAndScrollerOffset = boxAndScrollerOffset
      this[barName].barAndScrollerOffset = barAndScrollerOffset

      this._boxAndBarScroll({
        type: 'y',
        boxDistance: 0,
        barDistance: 0
      })
      this._boxAndBarScroll({
        type: 'x',
        boxDistance: 0,
        barDistance: 0
      })

      this.triggerChangeBar(type)
    },

    /**
     * 滚动条和滚动区域的滚动操作的相关数据
     * @param { Object } - 选项数据
     *                     type - 滚动条类型
     *                     barDistance - 滚动条的位移
     *                     boxDistance - 滚动内容的位移
     */
    _boxAndBarScroll({
      type,
      boxDistance,
      barDistance
    }) {
      let barName = type + 'Data'
      let barPositionName = `bar${type === 'y' ? 'Top' : 'Left'}`
      let boxPositionName = `box${type === 'y' ? 'Top' : 'Left'}`

      let barAndScrollerOffset = this[barName].barAndScrollerOffset
      let boxAndScrollerOffset = this[barName].boxAndScrollerOffset

      // 调整内容区域和滚动条的位置
      this[boxPositionName] = this[boxPositionName] < -boxAndScrollerOffset ? -boxAndScrollerOffset : this[boxPositionName]
      this[barName][barPositionName] = this[barName].scrollerContainBox ? 0 : -this[boxPositionName] * barAndScrollerOffset / boxAndScrollerOffset

      let boxPosition = this[boxPositionName] + boxDistance
      let barPosition = this[barName][barPositionName] + barDistance

      if (boxDistance >= 0) {
        this[barName][barPositionName] = barPosition < 0 ? 0 : barPosition
        this[boxPositionName] = boxPosition > 0 ? 0 : boxPosition
      } else {
        this[barName][barPositionName] = barPosition > barAndScrollerOffset ? barAndScrollerOffset : barPosition
        this[boxPositionName] = boxPosition < -boxAndScrollerOffset ? -boxAndScrollerOffset : boxPosition
      }
    },

    /**
     * 滚动条的高度/宽度改变事件
     */
    _scrollerChange() {
      return this.$nextTick(() => {
        this.$emit('change', {
          emitter: this,
          scrollerWidth: this.scrollerWidth,
          scrollerHeight: this.scrollerHeight
        })
      })
    },

    _handlerKeydown(event) {
      switch (event.keyCode) {
        case keyCode.up:
          this.up()
          break
        case keyCode.down:
          this.down()
          break
        case keyCode.left:
          this.left()
          break
        case keyCode.right:
          this.right()
          break
        default:
          break
      }
    }
  },

  created() {
    function checkScrollerParent(parent = {}) {
      if (parent.compName === 'scroller') {
        return true
      } else if (parent.constructor.name === 'VueComponent') {
        return checkScrollerParent(parent.$parent)
      } else {
        return false
      }
    }

    this.hasScrollerGrandpa = checkScrollerParent(this.$parent)
  },

  destroyed() {
    clearInterval(this.interValInitScroller)
  }
}
