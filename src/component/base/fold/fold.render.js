/**
 * fold.render.js
 */

export default function (h) {
  let foldChildren = []

  if (this.foldChildren.length > 0) {
    this.foldChildren.forEach((item, index) => {
      let contentIndex = index + 1
      let foldTitle = []

      const slotEle = item.content

      if (slotEle) {
        foldTitle.push(
          h('icon', {
            class: [this.xclass('icon')],
            props: {
              kind: this.foldTitleIcon(contentIndex)
            }
          })
        )

        if (slotEle[0].data.attrs) {
          foldTitle.push(slotEle[0].data.attrs.title)
        } else {
          foldTitle.push(item.title)
        }
      } else {
        foldTitle.push(item.title)
      }

      foldChildren.push(
        h('dt',
          {
            attrs: {
              'data-index': contentIndex
            },
            class: [this.foldContentActive(contentIndex)],
            on: {
              click: slotEle ? this.clickTitle : () => {
                return false
              }
            }
          }, foldTitle
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
                  style: this.foldData[index].style
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
