/**
 * pop.render.js
 */

export default function (h) {
  let modalChildren = []
  let headerChildren = []

  if (this.isFull) {
    if (!this.isBiggerFull) {
      headerChildren.push(
        h('column',
          {
            class: [this.xclass('header-nav')],
            props: {
              xs: 2,
              l: 1
            }
          },
          [
            h('icon', {
              props: {
                kind: this.commit ? 'close' : 'arrow-left',
                size: 'L'
              }
            })
          ]
        )
      )
    }

    headerChildren.push(
      h('column',
        {
          props: {
            xs: this.commit ? 8 : 9,
            l: this.commit ? 10 : 11,
          }
        },
        [
          h('span', {
            class: this.xclass('header-title')
          }, this.header)
        ]
      )
    )

    if (!this.isBiggerFull && this.commit) {
      headerChildren.push(
        h('column', {
          props: {
            xs: 2,
            l: 1
          }
        }, [h('span', this.okBtn)])
      )
    }
  } else {
    headerChildren.push(
      h('column', { props: { span: 12 } },
        [
          h('span', {
            class: this.xclass('header-title')
          }, this.header)
        ]
      )
    )
  }

  if (this.headerDisplay) {
    modalChildren.push(
      h('header',
        {
          on: {
            mousedown: this.mouseDown,
            mouseup: this.mouseUp
          }
        }, [
          h('row', {
            props: { justify: 'justify' }
          }, headerChildren)
        ]
      )
    )
  }

  modalChildren.push(
    h('article',
      { class: { [this.xclass('has-scroller')]: this.hasScroller } },
      [
        h('scroller', {
          class: [this.xclass('scroller')],
          props: {
            height: this.isFull ? (this.isBiggerFull ? 300 : '100%') : 120,
            autoHide: true
          },
          ref: 'scroller'
        }, (() => {
          if (this.$slots.default) {
            return this.$slots.default
          } else {
            return [
              h('div', {
                class: this.xclass('alert-message')
              }, this.modalMessage)
            ]
          }
        })())
      ]
    )
  )

  if (this.footerDisplay || (this.footerDisplay && this.isFull && this.isBiggerFull)) {
    let footerChildren = []

    if (this.noBtn) {
      footerChildren.push(h('btn', {
        props: {
          value: this.noBtn,
          type: 'flat'
        },
        on: {
          click: this.no
        }
      }))
    }

    if (this.okBtn) {
      footerChildren.push(
        h('btn', {
          props: {
            value: this.okBtn,
            type: 'flat'
          }
        })
      )
    }


    modalChildren.push(
      h('footer', {
        class: this.footerClass
      }, footerChildren)
    )
  }

  return h('no-transition',
    {
      props: {
        speed: 'fast'
      }
    },
    [
      h('div',
        {
          class: [
            this.cPrefix,
            this.xclass([this.themeClass]),
            this.xclass(`type-${this.type}`)
          ],
          directives: [{
            name: 'show',
            value: this.modalDisplay
          }],
          on: {
            mousemove: this.mouseMove
          }
        },
        [
          h('fade-transition',
            {
              props: {
                speed: 'fast'
              }
            },
            [
              h('div', {
                class: this.xclass('bg'),
                directives: [{
                  name: 'show',
                  value: this.modalDisplay
                }],
                on: {
                  click: () => {
                    this.hide()
                  }
                }
              })
            ]
          ),

          h('pop',
            {
              class: [this.xclass('pop')],
              ref: 'pop'
            },
            [modalChildren]
          )
        ]
      )
    ]
  )
}
