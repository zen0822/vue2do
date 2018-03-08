/**
 * pop.render.js
 */

export default function (h) {
  return h('div', {
    class: [
      this.cPrefix,
      this.xclass([
        this.themeClass,
        'type-' + this.messageType
      ])
    ],
    directives: [{
      name: 'show',
      value: this.messageDisplay
    }]
  }, [
    h('pop', {
      class: [this.xclass('pop')],
      props: {
        direction: this.direction,
        position: this.position,
        ui: this.ui,
        theme: this.theme
      },
      ref: 'pop'
    }, this.$slots.default ? this.$slots.default : this.infoMessage)
  ])
}
