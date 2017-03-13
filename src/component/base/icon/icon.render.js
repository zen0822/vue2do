/**
 * icon.render.js
 */

export default function (h) {
  return h(
    'div',
    {
      class: [this.cPrefix]
    },
    [
      h('div', {
        class: this.xclass(['stage', this.themeClass])
      }, [
        h('i', {
          class: [this.typeClass, this.nameClass, this.sizeClass]
        })
      ])
    ]
  )
}
