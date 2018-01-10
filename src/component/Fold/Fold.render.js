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
              kind: this.foldTitleIcon(contentIndex),
              size: 'xs',
              ui: this.ui,
              theme: this.theme
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
        h('dt', {
          class: [this.foldContentActive(contentIndex)],
          on: {
            click: (event) => {
              if (slotEle) {
                return this.clickTitle(event, contentIndex)
              }

              return false
            }
          }
        }, foldTitle)
      )

      foldChildren.push(
        h('dd', {
          class: [this.foldContentActive(contentIndex)]
        }, [
          h('fold-transition', {
            height: this.transitionChildHeight,
            ref: `transition${contentIndex}`
          }, [
            h('div', {
              class: [this.xclass('transition')],
              css: false,
              style: this.foldData[index].style
            }, slotEle)
          ])
        ])
      )
    })
  }

  return h('div', {
    class: [this.cPrefix, this.xclass(this.themeClass)]
  }, [
    h('dl', {
      class: [this.xclass('dl')]
    }, foldChildren)
  ])
}
