/**
 * fold.render.js
 */

export default function (h) {
  let foldChildren = []

  if (this.$slots) {
    this.$slotKey.forEach((item, index) => {
      if (item === 'default' || !/content-/.test(item)) {
        return false
      }

      let contentIndex = Number(item.split('-')[1])

      const slotEle = this.$slots[item]
      let foldTitle = slotEle[0].data.attrs
        ? slotEle[0].data.attrs.title
        : this.$slots[item.replace('content', 'title')]

      foldChildren.push(
        h('dt',
          {
            attrs: {
              'data-index': contentIndex
            },
            class: [this.foldContentActive(contentIndex)],
            on: {
              click: this.clickTitle
            }
          },
          [
            foldTitle,
            h('icon', {
              class: [this.xclass('icon')],
              props: {
                kind: this.foldTitleIcon(contentIndex)
              }
            })
          ]
        )
      )

      foldChildren.push(
        h('dd',
          {
            attrs: {
              'data-index': contentIndex
            },
            class: [this.foldContentActive(contentIndex)]
          },
          [
            h('fold-transition',
              [
                h('div', {
                  class: [this.xclass('transition')],
                  css: false,
                  directives: [{
                    name: 'show',
                    value: !this.foldingStatus(contentIndex)
                  }],
                  style: this.foldData[contentIndex - 1].style
                }, slotEle)
              ]
            )
          ]
        )
      )
    })
  }

  return h('div',
    {
      class: [this.cPrefix, this.xclass(this.themeClass)]
    },
    [
      h('dl',
        {
          class: [this.xclass('dl')]
        }, foldChildren
      )
    ]
  )
}
