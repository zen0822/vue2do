/**
 * scroller 组件 滚动条
 *
 * @prop height - 滚动区域的高度(auto | { Number }px | 100% | <{ Number })
 * @prop width - 滚动内容最大高度(auto | {Number}px | 100%)
 * @prop autoHide - 自动隐藏滚动条
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
 * @event changeYBar - y-bar 滚动条改变
 *                  return isBottom - 滚动条是否到低
 *                         isTop - 滚动条是否到顶
 *                         top - 滚动条到滚动区域的顶部的当前距离
 *                         offset - 滚动条离滚动区域的顶部的距离
 * @event changeXBar - x-bar 滚动条改变
 *                  return isRight - 滚动条是否到结束的地方
 *                         isLeft - 滚动条是否到开始的地方
 *                         left - 滚动条到滚动区域的最左边的当前距离
 *                         offset - 滚动条离滚动区域的顶部的距离
 * @event changeScroller - 滚动区域的高度/宽度变化
 */

import './scroller.scss'

import baseMixin from '../../../mixin/base'
import render from './scroller.render.js'

import fadeTransition from '../../transition/fade'

// 滚动一次的滚动区域走的像素大小
const SCROLL_PIXEL = 10

const scrollerComp = {
  name: 'scroller',

  mixins: [baseMixin],

  render,

  components: {
    'fade-transition': fadeTransition
  },

  props: {
    height: {
      type: [Number, String],
      default: '100%'
    },

    maxHeight: {
      type: [Number, String],
      default: 'none'
    },

    width: {
      type: [Number, String],
      default: '100%'
    },

    autoHide: {
      type: Boolean,
      default: false
    }
  },

  data() {
    // 组件名字
    this.compName = 'scroller'

    return {
      // y-scroller detail
      yData: {
        // 滚动条和滚动区域的偏移值
        barAndScrollerOffset: 0,
        // 滚动条的高度
        barLength: 0,
        // bar 的高度
        barTop: 0,
        // 滚动容器 / 滚动条区域
        boxBarRate: 0,
        // 滚动内容和滚动区域的偏移值
        boxAndScrollerOffset: 0,
        // 滚动条的 mousedown 事件
        isMousedown: false,
        // 记录上一次滚动条的高度
        oldBarTop: 0,
        // 滚动一次的滚动条走的像素大小
        scrollBarPixel: 0,
        // 滚动条的高度是否大于滚动容器
        scrollerContainBox: false
      },
      // x-scroller detail
      xData: {
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
      // box 离最顶端的偏移值
      boxTop: 0,
      // box 离最开始的偏移值
      boxLeft: 0,
      // 滚动区域的高度
      boxHeight: 0,
      // 滚动区域的宽度
      boxWidth: 0,
      // 滚动区域的样式宽度
      boxStyleWidth: '',
      // 滚动容器的高度
      scrollerHeight: 0,
      // 滚动容器的宽度
      scrollerWidth: 0,
      // 滚动条自动隐藏的状态
      showBar: false,
      // 滚动区域的 touchend 事件
      isTouchStart: false,
      // 记录连续滚动的标注
      scrolling: false,
      // 记录是否还在触摸移动中
      moving: false,
      // 是否有 scroller 组件的祖先
      hasScrollerGrandpa: false,
      // 记录开始触摸滚动区域的坐标
      touchStart: {
        x: 0,
        y: 0
      },
      // 记录开始点击滚动条的坐标
      pointStart: {
        x: 0,
        y: 0
      }
    }
  },

  computed: {
    boxStyle() {
      return {
        'top': this.boxTop + 'px',
        'left': this.boxLeft + 'px',
        'width': this.boxStyleWidth
      }
    },

    scrollerStyle() {
      return this.height === '100%' ? {} : {
        'height': this.scrollerHeight + 'px'
      }
    },

    // x 方向的计算属性
    xComputed() {
      return {
        barDisplay: !this.xData.scrollerContainBox && (!this.autoHide || this.showBar),
        isLeft: this.xData.barLeft === 0,
        isRight: this.xData.barLeft === this.xData.barAndScrollerOffset,
        barStyle: {
          'width': this.xData.barLength + 'px',
          'left': this.xData.barLeft + 'px'
        }
      }
    },

    // y 方向的计算属性
    yComputed() {
      return {
        // 是否显示滚动条
        barDisplay: !this.yData.scrollerContainBox && (!this.autoHide || this.showBar),
        // 滚动条是否在顶部
        isTop: this.yData.scrollerContainBox || this.yData.barTop === 0,
        // 滚动条是否在底部
        isBottom: this.yData.scrollerContainBox || this.yData.barTop === this.yData.barAndScrollerOffset,
        barStyle: {
          'height': this.yData.barLength + 'px',
          'top': this.yData.barTop + 'px'
        }
      }
    },

    // 组件类名的前缀
    cPrefix() {
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

    boxHeight(boxHeight) {
      this._initScrollerData({
        length: this.height,
        scrollerLength: this.scrollerHeight,
        boxLength: boxHeight,
        type: 'y'
      })
    },

    boxWidth(boxWidth) {

    },

    scrollerHeight(scrollerHeight) {
      this._initScrollerData({
        length: this.height,
        scrollerLength: scrollerHeight,
        boxLength: this.boxHeight,
        type: 'y'
      })

      return this._changeScroller()
    },

    scrollerWidth(scrollerWidth) {

    }
  },

  methods: {
    _initComp() {
      this.$box = this.$refs.box
      this._initScroller()

      setInterval(() => {
        this._initScroller()
      }, 10)
    },

    _binder() {
      document.addEventListener('mousemove', this.scrollerMouseMove)
      document.addEventListener('mouseup', this.scrollerMouseUp)
    },

    // 初始化滚动条
    _initScroller() {
      let scrollerHeight = this.$el.offsetHeight
      let scrollerWidth = this.$el.offsetWidth

      let boxHeight = this.$box.offsetHeight
      let boxWidth = this.$box.offsetWidth

      let firstChildWidth = this.$box.firstChild ? this.$box.firstChild.offsetWidth : 0

      if (firstChildWidth > boxWidth) {
        this.boxStyleWidth = firstChildWidth + 'px'
      } else if (boxWidth <= scrollerWidth) {
        this.boxStyleWidth = scrollerWidth + 'px'
      } else {
        this.boxStyleWidth = 'auto'
      }

      if (scrollerHeight !== this.scrollerHeight) {
        this.scrollerHeight = scrollerHeight

        this._initScrollerData({
          length: this.height,
          scrollerLength: scrollerHeight,
          boxLength: boxHeight,
          type: 'y'
        })

        this._changeScroller()
      }

      if (scrollerWidth !== this.scrollerWidth) {
        this.scrollerWidth = scrollerWidth

        this._initScrollerData({
          length: this.width,
          scrollerLength: scrollerWidth,
          boxLength: boxWidth,
          type: 'x'
        })

        this._changeScroller()
      }

      if (boxHeight !== this.boxHeight) {
        this.boxHeight = boxHeight

        this._initScrollerData({
          length: this.height,
          scrollerLength: scrollerHeight,
          boxLength: boxHeight,
          type: 'y'
        })
      }

      if (boxWidth !== this.boxWidth) {
        this.boxWidth = boxWidth

        this._initScrollerData({
          length: this.width,
          scrollerLength: scrollerWidth,
          boxLength: boxWidth,
          type: 'x'
        })
      }
    },

    /**
     * 初始化滚动的数据
     * @param { Object } - 选项数据
     *                   type - 滚动条类型
     *                   scrollerLength - 滚动区域的高度/宽度
     *                   boxLength - 滚动内容的高度/宽度
     *                   length - 指定的滚动区域的高度/宽度
     */
    _initScrollerData({
      type,
      scrollerLength,
      boxLength,
      length
    }) {
      // 滚动条数据的名字
      let barName = type + 'Data'
      // 滚动区域是否大过滚动内容
      let scrollerContainBox = false
      // 滚动内容和滚动条的比
      let boxBarRate = 0
      // 滚动条的长度
      let barLength = 0
      // 滚动内容和滚动区域的偏移值
      let boxAndScrollerOffset = 0
      // 滚动条和滚动区域的偏移值
      let barAndScrollerOffset = 0
      // 滚动条位置名字
      let barPositionName = `bar${type === 'y' ? 'Top' : 'Left'}`
      // 滚动内容位置名字
      let boxPositionName = `box${type === 'y' ? 'Top' : 'Left'}`

      if (type === 'y') {
        if (length === '100%') {
          scrollerContainBox = scrollerLength > boxLength
        } else if (length === 'auto') {
          scrollerContainBox = true
          scrollerLength = scrollerContainBox ? boxLength : length
          this.scrollerHeight = scrollerLength
        } else {
          scrollerContainBox = length >= boxLength
          scrollerLength = scrollerContainBox ? boxLength : length
          this.scrollerHeight = scrollerLength
        }

        boxBarRate = boxLength / scrollerLength
        barLength = scrollerLength / boxBarRate

        if (scrollerContainBox) {
          this.boxTop = 0
          this.barTop = 0
        }
      } else {
        if (length === '100%') {
          scrollerContainBox = scrollerLength >= boxLength
        } else {
          scrollerContainBox = length >= boxLength
        }

        boxBarRate = boxLength / scrollerLength
        barLength = scrollerLength / boxBarRate

        if (scrollerContainBox) {
          this.boxLeft = 0
          this.barLeft = 0
        }
      }

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

      return {
        boxHeight: this.boxHeight,
        boxWidth: this.boxWidth,
        scrollerHeight: this.scrollerHeight,
        scrollerWidth: this.scrollerWidth
      }
    },

    /**
     * 滚动条和滚动区域的滚动操作的相关数据
     * @param { Object } - 选项数据
     *                   type - 滚动条类型
     *                   barDistance - 滚动条的位移
     *                   boxDistance - 滚动内容的位移
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
      this[barName][barPositionName] = this.scrollerContainBox ? 0 : -this[boxPositionName] * barAndScrollerOffset / boxAndScrollerOffset

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
    _changeScroller() {
      return this.$nextTick(() => {
        this.$emit('changeScroller', {
          emitter: this,
          scrollerWidth: this.scrollerWidth,
          scrollerHeight: this.scrollerHeight
        })
      })
    },

    barClick(evt) {
      evt.preventDefault()
      evt.stopPropagation()
    },

    yBarMouseDown(evt) {
      this.yData.isMousedown = true

      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      }
    },

    xBarMouseDown(evt) {
      this.xData.isMousedown = true

      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      }
    },

    scrollerMouseMove(evt) {
      if (!this.yData.isMousedown && !this.xData.isMousedown) {
        return false
      }

      evt.preventDefault()

      let type = this.yData.isMousedown ? 'y' : 'x'
      let distance = evt[`client${type.toUpperCase()}`] - this.pointStart[type]

      this._boxAndBarScroll({
        type,
        boxDistance: -distance * this[`${type}Data`].boxBarRate,
        barDistance: distance
      })

      this.pointStart = {
        x: evt.clientX,
        y: evt.clientY
      }

      return this.triggerScroll(type)
    },

    scrollerMouseUp(evt) {
      evt.preventDefault()

      this.yData.isMousedown = false
      this.xData.isMousedown = false
    },

    scrollerMouseover(evt) {
      this.showBar = true
    },

    scrollerMouseout(evt) {
      this.showBar = false
    },

    mouseWheel(evt) {
      let barTop = 0
      let boxTop = 0

      this.yData.oldBarTop = this.yData.barTop

      this._boxAndBarScroll({
        type: 'y',
        boxDistance: evt.deltaY > 0 ? -SCROLL_PIXEL : SCROLL_PIXEL,
        barDistance: evt.deltaY > 0 ? this.yData.scrollBarPixel : -this.yData.scrollBarPixel
      })

      this.triggerScroll('y')

      if (this.yComputed.isBottom || this.yComputed.isTop) {
        if (this.scrolling) {
          evt.preventDefault()

          return false
        }

        this.scrolling = true

        setTimeout(() => {
          this.scrolling = false
        }, 200)
      }

      if (!(this.yComputed.isBottom || this.yComputed.isTop) || this.yData.oldBarTop !== this.yData.barTop) {
        evt.preventDefault()
      }
    },

    scrollerTouchStart(evt) {
      this.isTouchStart = true
      this.showBar = true

      this.touchStart = {
        x: evt.touches[0].clientX,
        y: evt.touches[0].clientY
      }
    },

    scrollerTouchMove(evt) {
      if (this.yData.scrollerContainBox && this.xData.scrollerContainBox) {
        this.triggerScroll('y')

        return false
      }

      this.showBar = true

      if (!this.isTouchStart) {
        return false
      }

      let yDistance = this.touchStart.y - evt.touches[0].clientY
      let xDistance = this.touchStart.x - evt.touches[0].clientX

      if (!this.yData.scrollerContainBox) {
        this._boxAndBarScroll({
          type: 'y',
          boxDistance: -yDistance,
          barDistance: yDistance / this.yData.boxBarRate
        })

        this.triggerScroll('y')
      }

      if (!this.xData.scrollerContainBox) {
        this._boxAndBarScroll({
          type: 'x',
          boxDistance: -xDistance,
          barDistance: xDistance / this.xData.boxBarRate
        })


        this.triggerScroll('x')
      }

      this.touchStart = {
        x: evt.touches[0].clientX,
        y: evt.touches[0].clientY
      }

      // 滚动区域正方向移动
      // TODO: 优化，可以在滚动到底部得时候触发父容器得滚动事件
      if (yDistance > 0) {
        if (this.yComputed.isBottom && !this.hasScrollerGrandpa) {} else {
          evt.preventDefault()
        }
      } else {
        if (this.yComputed.isTop && !this.hasScrollerGrandpa) {} else {
          evt.preventDefault()
        }
      }
    },

    scrollerTouchEnd(evt) {
      this.showBar = false
      this.isTouchStart = false
      this.moving = false
    },

    /**
     * 触发滚动条滚动事件
     */
    triggerScroll(type) {
      let data = {}
      let eventName = ''

      if (type === 'y') {
        eventName = 'scrollY'
        data = {
          emitter: this,
          top: this.yData.barTop,
          offset: this.yData.barAndScrollerOffset,
          isBottom: this.yComputed.isBottom,
          isTop: this.yComputed.isTop
        }
      } else {
        eventName = 'scrollX'
        data = {
          emitter: this,
          left: this.xData.barLeft,
          offset: this.xData.barAndScrollerOffset,
          isRight: this.xComputed.isRight,
          isLeft: this.xComputed.isLeft
        }
      }

      return this.$nextTick(() => {
        this.$emit(eventName, data)
      })
    },

    triggerChangeBar(type) {
      let data = {}
      let eventName = ''

      if (type === 'y') {
        eventName = 'changeYBar'
        data = {
          isBottom: this.yComputed.isBottom,
          isTop: this.yComputed.isTop,
          boxWidth: this.boxWidth,
          boxHeight: this.boxHeight,
          hasScroller: !this.yData.scrollerContainBox
        }
      } else {
        eventName = 'changeXBar'
        data = {
          isLeft: this.xComputed.isLeft,
          isRight: this.xComputed.isRight,
          boxWidth: this.boxWidth,
          boxHeight: this.boxHeight,
          hasScroller: !this.xData.scrollerContainBox
        }
      }

      return this.$emit(eventName, data)
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
  }
}

export default scrollerComp
