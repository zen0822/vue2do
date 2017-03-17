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
            on: {
              click: this.clickTitle
            }
          },
          [
            foldTitle,
            h('icon', {
              class: [this.xclass('icon')],
              props: {
                kind: this.foldData[contentIndex - 1].folding ? 'fold' : 'spread'
              }
            })
          ]
        )
      )

      foldChildren.push(
        h('dd', {
          class: [{

          }]
        }, slotEle))
    })
  }

  return h('div',
    {
      class: [this.cPrefix]
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
