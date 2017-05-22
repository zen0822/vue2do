/**
 * pop.render.js
 */

export default function (h) {
  let popChildren = []

  if (!this.pop && !this.isTip && this.headerDisplay) {
    popChildren.push(
      h('header',
        {
          class: this.headerClass,
          on: {
            mousedown: this.mouseDown,
            mouseup: this.mouseUp
          }
        },
        [
          h('span', this.popHeaderName),
          h('span', {
            class: [this.prefixClass('clear-fix')],
            on: {
              click: this.hide
            }
          }, (() => {
            if (this.headerNoBtnDisplay) {
              return [h('icon', {
                class: this.xclass('close-pop'),
                directives: [{
                  name: 'show',
                  value: !this.popHeaderName
                }],
                props: {
                  kind: 'close',
                  size: 'L'
                }
              })]
            }

            return []
          })())
        ]
      )
    )
  }

  if (this.$slots.default) {
    popChildren.push(h('article', this.$slots.default))
  } else {
    popChildren.push(h('article', [
      h('div', {
        class: this.xclass('alert-message')
      }, this.popMessage)
    ]))
  }

  if (!this.pop && !this.isTip && this.footerDisplay) {
    let footerChildren = []

    if (!this.isAlert && this.noBtnDisplay) {
      footerChildren.push(h('btn', {
        props: {
          value: this.noBtnName,
          kind: 'default'
        },
        on: {
          click: this.cancel
        }
      }))
    }

    footerChildren.push(
      h('btn', {
        props: {
          value: this.okBtnName,
          kind: 'primary'
        },
        on: {
          click: this.ok
        }
      })
    )

    popChildren.push(
      h('footer', {
        class: this.footerClass
      }, footerChildren)
    )
  }

  return h('transition',
    {
      props: {
        name: this.prefixClass('hide')
      }
    },
    [
      h('div',
        {
          class: [this.cPrefix],
          directives: [{
            name: 'show',
            value: this.popDisplay
          }]
        },
        [
          h('div',
            {
              class: this.stageClass.concat(
                { [this.xclass('pure')]: this.pop },
                this.xclass([this.themeClass, 'stage'])
              ),
              on: {
                mousemove: this.mouseMove
              }
            },
            [
              h('transition',
                {
                  props: {
                    name: this.prefixClass('bg')
                  }
                },
                [
                  h('div', {
                    class: this.xclass('bg'),
                    directives: [{
                      name: 'show',
                      value: !this.isTip && this.popDisplay
                    }],
                    on: {
                      click: () => {
                        !this.noClickBgHide && this.hide()
                      }
                    }
                  })
                ]
              ),

              h('transition',
                {
                  props: {
                    name: this.prefixClass(`${this.isTip ? 'bounce-down' : 'slide-down'}`)
                  }
                },
                [
                  h('div',
                    {
                      class: this.xclass('container'),
                      directives: [{
                        name: 'show',
                        value: this.popDisplay
                      }]
                    }, popChildren
                  )
                ]
              )
            ]
          )
        ]
      )
    ]
  )
}
