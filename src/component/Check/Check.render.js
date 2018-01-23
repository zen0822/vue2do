/**
 * check.render.js
 */
import Vue from 'vue'

export default function (h) {
  let RowChildren = []

  if (Array.isArray(this.option) && this.option.length > 0) {
    let checkEle = []

    this.option.forEach((item, index) => {
      const currentIndex = index + 1

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
            h('div', {
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
                ref: `motionCheck${currentIndex}`
              }),
              h('div', {
                class: [this.xclass('motion-rip')],
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
              size: 'XS',
              kind: this._getIconName(this.checkedAll),
              ui: this.ui,
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
      },
      RowChildren
    )
  ])
}
