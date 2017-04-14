/**
 * select.render.js
 */
export default function (h) {
  let selectedBoxChildren = []
  let menuChildren = []

  if (this.multiple) {
    let liELe = []

    selectedBoxChildren.push(
      h('input-box', {
        class: [
          this.xclass('init-text-input')
        ],
        on: {
          blur: this.blur,
          focus: this.focus
        }
      }),
      h('input-box', {
        class: [
          this.defaultValClassName(this.value),
          this.xclass('init-text'),
          { [this.xclass('opacity')]: !this.initTxtDisplay }
        ],
        props: {
          placeholder: this.defaultTxt,
          readOnly: true
        }
      })
    )

    this.text.forEach((txt, index) => {
      liELe.push(h('li',
        {
          attrs: {
            'data-value': this.value[index]
          }
        }, [
          h('span', txt),
          h('span',
            {
              on: {
                click: this.removeMultiSelected
              }
            },
            [
              h('icon', {
                props: {
                  kind: 'close'
                }
              })
            ]
          )
        ])
      )
    })

    selectedBoxChildren.push(
      h('scroller',
        {
          class: [this.xclass('scroller')],
          props: {
            height: 100
          },
          ref: 'scroller'
        },
        [
          h('ul', {
            class: [
              `${this.compPrefix}-ul`,
              this.xclass('multiple')
            ],
            directives: [{
              name: 'show',
              value: !this.initTxtDisplay
            }]
          }, [liELe])
        ]
      )
    )
  } else {
    selectedBoxChildren.push(
      h('input-box', {
        class: [
          this.xclass('init-text-input')
        ],
        on: {
          blur: this.blur,
          focus: this.focus
        },
        props: {
          readOnly: true
        }
      }),

      h('input-box', {
        class: [
          this.defaultValClassName(this.value),
          this.xclass('init-text')
        ],
        props: {
          placeholder: '请选择',
          initVal: this.text,
          readOnly: true
        }
      })
    )
  }

  selectedBoxChildren.push(h('icon', {
    class: [this.xclass('caret-down-icon')],
    props: {
      kind: 'spread'
    }
  }))

  if (this.search) {
    menuChildren.push(h('div',
      {
        class: [
          this.xclass('search-input')
        ],
        on: {
          click(event) {
            event.stopPropagation()
          }
        }
      },
      [
        h('icon', {
          props: {
            kind: 'search'
          }
        }),
        h('input-box', {
          props: {
            placeholder: '请输入搜索值',
            type: 'text'
          }
        })
      ]
    ))
  }

  if (Array.isArray(this.option)) {
    let scopedSlots = []

    if (this.$scopedSlots && this.$scopedSlots['custom']) {
      this.option.forEach((item, index) => {
        Object.assign(scopedSlots, {
          [`${index}`]: (props) => {
            return this.$scopedSlots['custom']({
              item,
              index
            })
          }
        })
      })
    }

    menuChildren.push(
      h('select-opt',
        {
          class: [this.xclass('opt-comp')],
          props: {
            multiple: this.multiple,
            valName: this.valName,
            txtName: this.txtName,
            option: this.searchOptionDisplay
              ? this.searchOptionItem : this.option,
            optRoot: this.me
          },
          ref: 'selectOption',
          scopedSlots
        }
      ),
      h('div', {
        class: [this.xclass('option-slot'), `${this.compPrefix}-hide`]
      }, this.$slots.default)
    )
  }

  return h('div',
    {
      class: [this.cPrefix],
      directives: [{
        name: 'clickParent',
        expression: this.clickParent
      }]
    },
    [
      h('div',
        {
          class: this.stageClass
        },
        [
          h('div', {
            class: [this.xclass('read-only')],
            directives: [{
              name: 'show',
              value: this.readOnly
            }]
          }),
          h('div', {
            class: [this.xclass('selected-box')],
            on: {
              click: this.select
            }
          }, [selectedBoxChildren]),
          h('div',
            {
              class: [this.xclass('menu')],
              directives: [{
                name: 'show',
                value: !this.selectMenuDisplay
              }],
              style: this.selectMenuStyle
            },
            [menuChildren]
          )
        ]
      )
    ]
  )
}
