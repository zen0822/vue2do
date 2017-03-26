/**
 * menu.render.js
 */

function foldContent(h, foldList) {
  let foldChildren = []

  foldList.forEach((item, index) => {
    let subMenu = item.sub
    let flodNum = index + 1
    let contentChildren = []

    if (Array.isArray(subMenu) && subMenu.length > 0) {
      contentChildren = foldContent.call(this, h, subMenu)

      foldChildren.push(
        h('fold-title', {
          slot: 'title-' + flodNum
        }, item.name)
      )

      foldChildren.push(
        h('fold-content', {
          slot: 'content-' + flodNum
        }, [contentChildren])
      )
    } else {
      foldChildren.push(
        h('fold-title',
          {
            slot: 'title-' + flodNum
          },
          [
            h('router-link', {
              props: {
                to: item.route
              }
            }, item.name)
          ]
        )
      )
    }
  })

  return h('fold', {
    props: {
      spreadAll: true
    },
    class: [this.xclass('sub-fold')]
  }, foldChildren)
}

export default function (h) {
  return h('div',
    {
      class: [this.cPrefix, this.xclass(this.themeClass)]
    },
    [
      h('div',
        {
          class: [this.xclass('trigger')],
          on: {
            click: (evt) => {
              this.isStageActive = !this.isStageActive
            }
          }
        },
        [
          h('icon', {
            props: {
              kind: 'sort'
            }
          })
        ]
      ),
      h('div', {
        class: [
          this.xclass('stage'),
          { [this.xclass('active')]: this.isStageActive }
        ],
        on: {
          click: (evt) => {
            this.isStageActive = false
          }
        }
      }, [foldContent.call(this, h, this.initOpt)])
    ]
  )
}
