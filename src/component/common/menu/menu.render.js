/**
 * menu.render.js
 */

function foldContent(h, foldList) {
  if (!Array.isArray(foldList) || foldList.length === 0) {
    return false
  }

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
      spreadAll: this.spreadAll
    },
    class: [this.xclass('sub-fold')]
  }, foldChildren)
}

export default function (h) {
  let menuStage = []
  let stageChildren = [
    h('div', {
      class: [this.xclass('transition-container')]
    }, [
      h('div',
        {
          class: [this.xclass('close-menu')],
          on: {
            click: () => {
              this.hide()
            }
          }
        }, [
          h('icon', {
            props: {
              kind: 'close'
            }
          })
        ]
      ),
      this.$slots.head,
      foldContent.call(this, h, this.initOpt),
      this.$slots.tail
    ])
  ]

  if (this.animate === 'vertical') {
    menuStage.push(
      h('fold-transition',
        [
          h('div',
            {
              class: [
                this.xclass('stage'),
                this.xclass(`animate-${this.animate}`)
              ],
              directives: [{
                name: 'show',
                value: this.isStageActive
              }]
            },
            stageChildren
          )
        ]
      )
    )
  } else {
    menuStage.push(
      h('transition',
        {
          props: {
            name: 'bounce'
          }
        },
        [
          h('div',
            {
              class: [
                this.xclass('stage'),
                this.xclass(`animate-${this.animate}`),
                { [this.xclass('active')]: this.isStageActive }
              ]
            },
            stageChildren
          )
        ]
      )
    )
  }

  return h('div',
    {
      class: [this.cPrefix, this.xclass(this.themeClass)]
    },
    [
      h('div',
        {
          class: [
            this.xclass('trigger'),
            { [this.xclass('active')]: this.isStageActive }
          ],
          directives: [{
            name: 'show',
            value: this.trigger === 'show'
          }],
          on: {
            click: this.toggle
          }
        },
        [
          h('row', [
            h('column', {
              props: {
                span: 6
              }
            }, this.title),
            h('column', {
              class: [`${this.compPrefix}-text-right`],
              props: {
                span: 6
              }
            }, [
                h('icon', {
                  props: {
                    kind: this.isStageActive ? 'spread' : 'fold',
                    size: 'l'
                  }
                })
              ]
            )
          ])
        ]
      ),
      menuStage
    ]
  )
}
