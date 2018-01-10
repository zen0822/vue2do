/**
 * pop.render.js
 */

export default function (h) {
  return h(`${this.type}-transition`, {
    props: {
      direction: this.popDirection,
      global: !this.part,
      speed: this.speed,
      ui: this.ui,
      theme: this.theme
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
