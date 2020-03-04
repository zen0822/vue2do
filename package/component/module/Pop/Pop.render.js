/**
 * pop.render.js
 */

export default function (h) {
  return h(`motion-slide`, {
    props: {
      direction: this.popDirection,
      global: !this.part,
      speed: this.speed,
      type: this.type === 'none' ? 'none' : 'transform'
    },
    ref: 'transition'
  }, [
    h('div', {
      class: this.compClass,
      style: [this.positionStyle],
      directives: [{
        name: 'show',
        value: this.popDisplay
      }]
    }, this.$slots.default)
  ])
}
