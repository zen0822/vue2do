/**
 * nav.render.js
 */

function foldContent(h, foldList) {
  if (!Array.isArray(foldList) || foldList.length === 0) {
    return false
  }

  let foldChildren = []

  foldList.forEach((item, index) => {
    let subNav = item.sub
    let flodNum = index + 1
    let contentChildren = []

    if (Array.isArray(subNav) && subNav.length > 0) {
      contentChildren = foldContent.call(this, h, subNav)

      foldChildren.push(
        h('fold-title', {
          props: {
            ui: this.ui,
            theme: this.theme
          },
          slot: 'title-' + flodNum
        }, item.name)
      )

      foldChildren.push(
        h('fold-content', {
          props: {
            ui: this.ui,
            theme: this.theme
          },
          slot: 'content-' + flodNum
        }, [contentChildren])
      )
    } else {
      foldChildren.push(
        h('fold-title', {
          props: {
            ui: this.ui,
            theme: this.theme
          },
          slot: 'title-' + flodNum
        }, [
          h('router-link', {
            props: {
              to: item.route
            },
            nativeOn: {
              click: () => {
                if (this.isSmallDevice) {
                  this.hide()
                }
              }
            }
          }, item.name)
        ])
      )
    }
  })

  return h('fold', {
    props: {
      only: this.isSmallDevice ? true : this.only,
      spreadAll: this.isSmallDevice ? false : this.spreadAll,
      ui: this.ui,
      theme: this.theme
    },
    class: [this.xclass('sub-fold')]
  }, foldChildren)
}

export default function (h) {
  let navStage = []
  let stageChildren = [
    h('div', {
      class: [this.xclass('transition-container')]
    }, [
      h('div', {
        class: [this.xclass('close-nav')],
        on: {
          click: () => {
            this.hide()
          }
        }
      }, [
        h('icon', {
          props: {
            kind: 'close',
            ui: this.ui,
            theme: this.theme
          }
        })
      ]),
      this.$slots.start,
      foldContent.call(this, h, this.initOpt),
      this.$slots.end
    ])
  ]

  if (this.isVerticalType) {
    navStage.push(
      h('motion-fold', {
        ref: 'transition'
      }, [
        h('div', {
            class: [
              this.xclass('stage'),
              this.xclass(`animate-${this.navAnimate}`)
            ]
          },
          stageChildren
        )
      ])
    )
  } else {
    navStage.push(
      h('motion-slide', {
        props: {
          offset: 0
        },
        ref: 'transition'
      }, [
        h('div', {
            class: [
              this.xclass('stage'),
              this.xclass(`animate-${this.navAnimate}`)
            ]
          },
          stageChildren
        )
      ])
    )
  }

  return h('div', {
    class: [this.cPrefix, this.xclass(this.themeClass)]
  }, [
    h('div', {
      class: [
        this.xclass('trigger'),
        {
          [this.xclass('active')]: this.isStageActive
        }
      ],
      directives: [{
        name: 'show',
        value: this.trigger === 'show'
      }],
      on: {
        click: this.toggle
      }
    }, [
      h('row', [
        h('column', {
          props: {
            span: 6
          }
        }, this.title),
        h('column', {
          class: [this.xclass('arrow')],
          props: {
            span: 6
          }
        }, [
          h('icon', {
            props: {
              kind: this.isStageActive ? 'spread' : 'fold',
              size: 's',
              ui: this.ui,
              theme: this.theme
            }
          })
        ])
      ])
    ]),
    navStage
  ])
}
