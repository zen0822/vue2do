/**
 * icon.render.js
 */

export default function (h) {
  const iconChildren = []

  if (this.isAli) {
    iconChildren.push(h('svg', {
      class: [this.typeClass, this.sizeClass, this.xclass(this.kind)]
    }, [
        h('use', {
          attrs: {
            'xlink:href': `#${this.nameClass}`
          }
        })
      ]
    ))
  } else {
    iconChildren.push(h('i', {
      class: [this.typeClass, this.nameClass, this.sizeClass]
    }))
  }

  return h(
    'div',
    {
      class: [this.cPrefix]
    },
    [
      h('div', {
        class: this.xclass(['stage', this.themeClass])
      }, iconChildren)
    ]
  )
}
