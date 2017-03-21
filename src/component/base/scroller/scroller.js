/**
 *
 * scroller 组件 滚动条
 *
 * @props height - 滚动内容最大高度
 * @props autoHide - 自动隐藏滚动条
 *
 * @events scroll - 滚动事件
 *                  return isBottom - 滚动条是否到低
 *                         isTop - 滚动条是否到顶
 *                         top - 滚动条到滚动区域的顶部的当前距离
 *                         barToBox - 滚动条离滚动区域的顶部的距离
 * @events changeBar - 滚动事件
 *                  return isBottom - 滚动条是否到低
 *
 */

import './scroller.scss'

import baseMixin from 'src/mixin/base'
import render from './scroller.render.js'

// 滚动一次的滚动区域走的像素大小
const SCROLL_PIXEL = 10

const scrollerComp = {
  name: 'scroller',

  mixins: [baseMixin],

  render,

  props: {
    height: {
      type: Number,
      default: 150
    },

    autoHide: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // 滚动条自动隐藏的状态
      autoHideBar: false,
      // 滚动条的高度是否等于滚动容器的高度
      barBiggerScroller: false,
      // 滚动区域的高度
      boxHeight: 0,
      // 滚动条的高度
      barHeight: 0,
      // 滚动容器的高度
      scrollerHeight: 0,
      // box 的高度
      boxTop: 0,
      // bar 的高度
      barTop: 0,
      // 记录上一次滚动条的高度
      oldBarTop: 0,
      // 滚动容器的比 / 滚动条区域
      boxBarRate: 0,
      // 滚动一次的滚动条走的像素大小
      scrollBarPixel: 0,
      // 滚动容器的底部离滚动区域的高度
      boxToBottomHeight: 0,
      // 滚动条的底部离滚动条容器的底部的高度
      barToBottomHeight: 0,
      // 滚动条的 mousedown 事件
      isMousedown: false,
      // 记录连续滚动的标注
      scrolling: false,
      // 记录开始点击滚动条的坐标
      pointStart: {
        x: 0,
        y: 0
      }
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-scroller`
    },
    // 是否显示滚动条
    barDisplay() {
      return !this.barBiggerScroller && this.autoHideBar
    },
    // 滚动条是否在顶部
    isTop() {
      return this.barTop === 0
    },
    // 滚动条是否在底部
    isBottom() {
      return this.barTop === this.barToBottomHeight
    },
    scrollerStyle() {
      return {
        'max-height': this.height + 'px',
        'height': this.scrollerHeight + 'px'
      }
    },
    boxStyle() {
      return {
        'top': this.boxTop + 'px'
      }
    },
    barStyle() {
      return {
        'height': this.barHeight + 'px',
        'top': this.barTop + 'px'
      }
    }
  },

  watch: {
    barTop(val) {
      this.triggerScroll()
    },
    boxHeight(boxHeight) {
      this.barBiggerScroller = this.height > boxHeight
      this.scrollerHeight = this.barBiggerScroller ? boxHeight : this.height

      this.boxBarRate = boxHeight / this.scrollerHeight
      this.barHeight = this.scrollerHeight / this.boxBarRate

      if (!this.barBiggerScroller) {
        this.scrollBarPixel = SCROLL_PIXEL / this.boxBarRate
        this.boxToBottomHeight = boxHeight - this.scrollerHeight
        this.barToBottomHeight = this.scrollerHeight - this.barHeight
        this.barTop = -this.boxTop * this.barToBottomHeight / this.boxToBottomHeight
      }

      this.$emit('changeBar', {
        isBottom: this.isBottom
      })
    }
  },

  methods: {
    _init() {
      this.$box = $(this.$refs.box)
      this.$bar = $(this.$refs.bar)

      setInterval(() => {
        this._initScroller()
      }, 100)
    },

    // 初始化滚动条
    _initScroller() {
      this.boxHeight = this.$box.outerHeight()
    },

    barClick(evt) {
      evt.preventDefault()
      evt.stopPropagation()
    },

    barMouseDown(evt) {
      this.isMousedown = true

      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      }
    },

    scrollerMouseMove(evt) {
      evt.preventDefault()

      if (!this.isMousedown) {
        return false
      }

      let distance = evt.clientY - this.pointStart.y
      let barTop = this.barTop + distance
      let boxTop = this.boxTop - distance * this.boxBarRate

      if (distance > 0) {
        this.barTop = barTop > this.barToBottomHeight ? this.barToBottomHeight : barTop
        this.boxTop = boxTop < -this.boxToBottomHeight ? -this.boxToBottomHeight : boxTop
      } else if (distance < 0) {
        this.barTop = barTop < 0 ? 0 : barTop
        this.boxTop = boxTop > 0 ? 0 : boxTop
      }

      this.pointStart = {
        x: evt.clientX,
        y: evt.clientY
      }
    },

    scrollerMouseUp(evt) {
      evt.preventDefault()

      if (!this.isMousedown) {
        return false
      }

      this.isMousedown = false
    },

    scrollerMouseover(evt) {
      this.autoHideBar = true
    },

    scrollerMouseout(evt) {
      this.autoHideBar = false
    },

    mouseWheel(evt) {
      let barTop = 0
      let boxTop = 0

      this.oldBarTop = this.barTop

      if (evt.deltaY > 0) {
        barTop = this.barTop + this.scrollBarPixel
        this.barTop = barTop > this.barToBottomHeight ? this.barToBottomHeight : barTop

        boxTop = SCROLL_PIXEL - this.boxTop
        this.boxTop = boxTop > this.boxToBottomHeight ? -this.boxToBottomHeight : -boxTop
      } else {
        barTop = this.barTop - this.scrollBarPixel
        this.barTop = barTop < 0 ? 0 : barTop

        boxTop = SCROLL_PIXEL + this.boxTop
        this.boxTop = boxTop > 0 ? 0 : boxTop
      }

      this.triggerScroll()

      if (this.isBottom || this.isTop) {
        if (this.scrolling) {
          evt.preventDefault()

          return false
        }

        this.scrolling = true

        setTimeout(() => {
          this.scrolling = false
        }, 200)
      }

      if (!(this.isBottom || this.isTop) || this.oldBarTop !== this.barTop) {
        evt.preventDefault()
      }
    },

    triggerScroll() {
      return this.$emit('scroll', {
        top: this.barTop,
        barToBox: this.barToBottomHeight,
        isBottom: this.isBottom,
        isTop: this.isTop
      })
    }
  }
}

export default scrollerComp
