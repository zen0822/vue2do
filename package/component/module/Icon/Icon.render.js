/**
 * icon.render.js
 */

export default function (h) {
  const iconChildren = []

  if (this.isAli) {
    iconChildren.push(h('svg', {
      class: [this.xclass(this.kind), this.typeClass]
    }, [
      h('use', {
        attrs: {
          'xlink:href': `#${this.nameClass}`
        }
      })
    ]))
  } else {
    iconChildren.push(h('i', {
      class: [this.typeClass, this.nameClass, this.sizeClass]
    }))
  }

  return h(
    'div', {
      class: [this.cPrefix, this.sizeClass, this.xclass(this.themeClass)],
      style: {
        color: this.color,
        'font-size': `${this.fontSize}px`
      }
    }, [
      h('div', {
        class: this.xclass('stage')
      }, iconChildren)
    ]
  )
}
