/**
 * scroller.api
 */

// 滚动一次的滚动区域走的像素大小
const SCROLL_PIXEL = 10

export default {
  methods: {
    initScroller() {
      return this._initScroller()
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

    scrollerMouseenter(evt) {
      this.showBar = true
    },

    scrollerMouseleave(evt) {
      this.showBar = false
    },

    mouseWheel(evt) {
      this.triggerScroll('y')

      if ((evt.deltaY < 0 && this.yComputed.isTop === 0) ||
        (evt.deltaY > 0 && this.yComputed.isBottom === 0)) {
        return false
      }

      let barTop = 0
      let boxTop = 0

      this.yData.oldBarTop = this.yData.barTop

      this._boxAndBarScroll({
        type: 'y',
        boxDistance: evt.deltaY > 0 ? -SCROLL_PIXEL : SCROLL_PIXEL,
        barDistance: evt.deltaY > 0 ? this.yData.scrollBarPixel : -this.yData.scrollBarPixel
      })

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
        if (!this.yComputed.isBottom || this.hasScrollerGrandpa) {
          evt.preventDefault()
        }
      } else {
        if (!this.yComputed.isTop || this.hasScrollerGrandpa) {
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
        eventName = 'yBarChange'
        data = {
          isBottom: this.yComputed.isBottom,
          isTop: this.yComputed.isTop,
          boxWidth: this.boxWidth,
          boxHeight: this.boxHeight,
          hasScroller: !this.yData.scrollerContainBox
        }
      } else {
        eventName = 'xBarChange'
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
  }
}
