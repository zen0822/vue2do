/**
 * menu.render.js
 */
function foldContent(h, foldList) {
  let foldChildren = []

  foldList.forEach((item, index) => {
    let subMenu = item.sub
    let flodNum = index + 1
    let contentChildren = []

    foldChildren.push(
        h('fold-title', {
          slot: 'title-' + flodNum
      }, item.name)
    )

    if (Array.isArray(subMenu) && subMenu.length > 0) {
      contentChildren = foldContent.call(this, h, subMenu)

      foldChildren.push(
        h('fold-content', {
          slot: 'content-' + flodNum
        }, [contentChildren])
      )
    } else {
      foldChildren.push(
        h('fold-content', {
          slot: 'content-' + flodNum
        }, item.name)
      )
    }
  })

  return h('fold', {
    class: [this.xclass('sub-fold')]
  }, foldChildren)
}

export default function (h) {
  return h('div', {
    class: [this.cPrefix, this.xclass(this.themeClass)]
  }, [foldContent.call(this, h, this.initOpt)])
}
