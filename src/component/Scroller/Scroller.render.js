export default function (h) {
  return h(
    'div', {
      class: [this.cPrefix],
      on: {
        mouseenter: this.scrollerMouseenter,
        mouseleave: this.scrollerMouseleave,
        wheel: this.mouseWheel,
        touchstart: this.scrollerTouchStart,
        touchmove: this.scrollerTouchMove,
        touchend: this.scrollerTouchEnd,
        keydown: this._handlerKeydown
      }
    }, [
      h('div', {
        class: [this.xclass('box')],
        style: this.boxStyle,
        ref: 'box'
      }, this.$slots.default),

      h('motion-fade', {
        props: {
          opacity: true,
          speed: 'fast',
          display: !this.autoHide
        },
        ref: 'bar'
      }, [
        h('div', {
          class: [this.xclass(['bar', 'y-bar'])],
          on: {
            click: this.barClick,
            mousedown: this.yBarMouseDown
          },
          style: this.yComputed.barStyle
        })
      ]),

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
