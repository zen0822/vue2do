/**
 * pop.render.js
 */

export default function (h) {
  return h('div',
    {
      class: [
        this.cPrefix,
        this.xclass([
          this.themeClass,
          'type' + this.messageType
        ])
      ],
      directives: [{
        name: 'show',
        value: this.messageDisplay
      }]
    },
    [
      h('pop',
        {
          class: [this.xclass('pop')],
          ref: 'pop'
        },
        this.$slots.default ? this.$slots.default : this.infoMessage
      )
    ]
  )
}
