/**
 * check.render.js
 */
import Vue from 'vue'

export default function (h) {
  let ulChildren = []

  if (this.checkAll) {
    ulChildren.push(
      h('li', {
        class: [this.prefix('li')]
      }, [
        h('div', {
          class: [this.xclass('opt-check-all')],
          on: {
            click: this.checkAllOption
          }
        }, [
          h('icon', {
            props: {
              size: 'XS',
              kind: this.checkedAll ? 'square-check-o' : 'square-o'
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
      checkEle.push(
        h('li', {
          class: [this.prefix('li'), this.xclass('opt-li')],
          on: {
            click: (event) => this.check(event, index + 1)
          }
        }, [
          h('div', {
            class: [this.xclass('box')]
          }, [
            h('div', {
              class: [this.xclass('icon')]
            }, [
              h('icon', {
                props: {
                  size: 'xs',
                  kind: this.iconName(item[this.valName])
                }
              }),
              h('rip-transition', {
                class: [this.xclass('rip')],
                ref: `checkTransition${index + 1}`
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

    ulChildren.push(checkEle)
  }

  return h('div', {
    class: [
      this.cPrefix,
      this.xclass(['stage', this.themeClass])
    ]
  }, [
    h('div', {
      class: [this.xclass('read-only')],
      directives: [{
        name: 'show',
        value: this.readOnly
      }]
    }),
    h('ul', {
        class: [
          this.prefix('ul'),
          this.xclass('opt-ul')
        ]
      },
      ulChildren
    )
  ])
}
