/**
 * check.render.js
 */
export default function (h) {
  let RowChildren = []

  if (Array.isArray(this.option) && this.option.length > 0) {
    let checkEle = []

    this.option.forEach((item, index) => {
      const currentIndex = index + 1
      let iconTypeEle = null

      if (this.UIBootstrap) {
        iconTypeEle = h('div', {
          class: [this.xclass('icon')]
        }, [
          h('icon', {
            props: {
              kind: this.iconName(item[this.valName]),
              ui: this.ui,
              theme: this.theme
            }
          }),
          h('motion-rip', {
            class: [this.xclass('rip')],
            props: {
              circle: true
            },
            ref: `motionCheck${currentIndex}`
          }),
          h('div', {
            class: [this.xclass('motion-rip')],
            directives: [{
              name: 'show',
              value: this.itemFocus[index]
            }]
          })
        ])
      } else {
        iconTypeEle = h('div', {
          class: [this.xclass(['icon', `icon-${this.isCheckbox ? 'checkbox' : 'radio'}`])]
        }, [
          h('div', {
            class: [this.xclass(['icon-box'])]
          }, [
            h('div', {
              class: [this.xclass('icon-box-circle')]
            }),
            (this.isCheckbox ?
              h('div', {
                class: [this.xclass('icon-box-checked')]
              }, [
                h('icon', {
                  props: {
                    kind: 'square-check',
                    ui: this.ui,
                    theme: this.theme
                  }
                })
              ]) :
              h('div', {
                class: [this.xclass('icon-box-dot')]
              })
            )
          ]),
          h('div', {
            class: [this.xclass('motion-rip')]
          }),
          h('motion-rip', {
            class: [this.xclass('rip')],
            props: {
              circle: true,
              speed: 400,
              radius: 'M'
            },
            ref: `motionCheck${currentIndex}`
          })
        ])
      }

      checkEle.push(
        h('column', {
          class: [this.xclass('opt-col')]
        }, [
          h('div', {
            attrs: {
              tabindex: 0
            },
            class: [
              this.xclass('box'),
              {
                [this.xclass('checked')]: this.isCheckbox ?
                  this.value.includes(item.value) : index === this.index
              },
              {
                [this.xclass('focused')]: this.itemFocus[index]
              }
            ],
            on: {
              click: (event) => this._handlerClick(event, currentIndex),
              mousedown: (event) => this._handlerMousedown(event, currentIndex),
              mouseup: (event) => this._handlerMouseup(event, currentIndex),
              focus: (event) => this._handlerFocus(event, currentIndex),
              blur: (event) => this._handlerBlur(event, currentIndex),
              keyup: (event) => this._handlerKeyup(event, currentIndex)
            }
          }, [
            iconTypeEle,
            (() => {
              if (item[this.txtName]) {
                return h('span', {
                  class: [this.xclass('lable')]
                }, item[this.txtName])
              }
            })()
          ])
        ])
      )
    })

    RowChildren.push(checkEle)
  }

  return h('div', {
    class: [
      this.cPrefix,
      this.xclass(['stage', this.themeClass, this.uiClass]),
      {
        [this.xclass('multiple')]: this.multiple
      }
    ]
  }, [
    h('div', {
      class: [this.xclass('disabled')],
      directives: [{
        name: 'show',
        value: this.disabled
      }]
    }),
    (() => {
      if (this.checkAll && this.multiple) {
        return h('div', {
          class: [
            this.xclass('opt-check-all'),
            {
              [this.xclass('checked')]: this.checkedAll
            }
          ],
          on: {
            click: this.checkAllOption
          }
        }, [
          h('icon', {
            props: {
              kind: this._getIconName(this.checkedAll),
              theme: this.theme
            }
          }),
          h('span', {
            class: [this.xclass('lable')]
          }, '全选')
        ])
      }
    })(),
    h('row', {
      class: [
        this.xclass('opt-row')
      ],
      props: {
        justify: 'start'
      }
    }, RowChildren)
  ])
}
