/**
 * pop.render.js
 */

export default function (h) {
  return h(`${this.type}-transition`,
    {
      props: {
        direction: this.direction,
        speed: this.speed,
        detail: this.popDetail
      },
      ref: 'transition'
    },
    [
      h('div',
        {
          class: this.compClass,
          style: [this.positionStyle],
          directives: [{
            name: 'show',
            value: this.popDisplay
          }]
        }, this.$slots.default
      )
    ]
  )
}
