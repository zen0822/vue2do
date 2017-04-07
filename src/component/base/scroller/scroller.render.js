export default function (h) {
  return h(
    'div',
    {
      class: [this.cPrefix],
      style: this.scrollerStyle,
      on: {
        mousemove: this.scrollerMouseMove,
        mouseup: this.scrollerMouseUp,
        mouseover: this.scrollerMouseover,
        mouseout: this.scrollerMouseout,
        wheel: this.mouseWheel,
        touchstart: this.scrollerTouchStart,
        touchmove: this.scrollerTouchMove,
        touchend: this.scrollerTouchEnd
      }
    },
    [
      h('div', {
        class: [this.xclass('box')],
        style: this.boxStyle,
        ref: 'box'
      }, this.$slots.default),

      h('div', {
        class: [this.xclass(['bar', 'y-bar'])],
        on: {
          click: this.barClick,
          mousedown: this.yBarMouseDown
        },
        style: this.yComputed.barStyle,
        ref: 'bar',
        directives: [{
          name: 'show',
          value: this.yComputed.barDisplay
        }]
      }),

      h('div', {
        class: [this.xclass(['bar', 'x-bar'])],
        on: {
          click: this.barClick,
          mousedown: this.xBarMouseDown
        },
        style: this.xComputed.barStyle,
        ref: 'xBar',
        directives: [{
          name: 'show',
          value: this.xComputed.barDisplay
        }]
      })
    ]
  )
}
