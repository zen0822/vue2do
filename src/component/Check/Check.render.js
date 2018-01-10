/**
 * check.render.js
 */
import Vue from 'vue'

export default function (h) {
  let RowChildren = []

  if (this.checkAll) {
    RowChildren.push(
      h('column', [
        h('div', {
          class: [this.xclass('opt-check-all')],
          on: {
            click: this.checkAllOption
          }
        }, [
          h('icon', {
            props: {
              size: 'XS',
              kind: this.checkedAll ? 'square-check-o' : 'square-o',
              ui: this.ui,
              theme: this.theme
            }
          }),
          h('span', {
            class: [this.xclass('lable')]
          }, '全选')
        ])
      ])
    )
  }

  if (Array.isArray(this.option) && this.option.length > 0) {
    let checkEle = []

    this.option.forEach((item, index) => {
      const currentIndex = index + 1

      checkEle.push(
        h('column', {
          class: [this.xclass('opt-col')]
        }, [
          h('div', {
            class: [
              this.xclass('box'),
              {
                [this.xclass('checked')]: this.isCheckbox ?
                  this.value.includes(item.value) : index === this.index
              }
            ],
            on: {
              click: (event) => this._handlerClick(event, currentIndex),
              mousedown: (event) => this._handlerMousedown(event, currentIndex),
              mouseup: (event) => this._handlerMouseup(event, currentIndex)
            }
          }, [
            h('div', {
              attrs: {
                tabindex: 0
              },
              class: [this.xclass('icon')],
              on: {
                focus: (event) => this._handlerFocus(event, currentIndex),
                blur: (event) => this._handlerBlur(event, currentIndex),
                keyup: (event) => this._handlerKeyup(event, currentIndex)
              }
            }, [
              h('icon', {
                props: {
                  size: 'xs',
                  kind: this.iconName(item[this.valName]),
                  ui: this.ui,
                  theme: this.theme
                }
              }),
              h('motion-rip', {
                class: [this.xclass('rip')],
                ref: `checkTransition${currentIndex}`
              }),
              h('div', {
                class: [this.xclass('motion-rip')],
                props: {
                  ui: this.ui,
                  theme: this.theme
                },
                directives: [{
                  name: 'show',
                  value: this.motion[index]
                }]
              })
            ]),
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
      this.xclass(['stage', this.themeClass, this.uiClass])
    ]
  }, [
    h('div', {
      class: [this.xclass('read-only')],
      directives: [{
        name: 'show',
        value: this.readOnly
      }]
    }),
    h('row', {
        class: [
          this.xclass('opt-row')
        ],
        props: {
          justify: 'start'
        }
      },
      RowChildren
    )
  ])
}
