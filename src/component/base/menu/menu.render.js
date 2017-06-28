/**
 * menu.render.js
 */
export default function (h) {
  let selectedBoxChildren = []
  let menuChildren = []
  let menuMenuEle = []

  if (this.multiple) {
    let liELe = []

    selectedBoxChildren.push(
      h('input', {
        class: [
          this.xclass('init-text-input')
        ],
        on: {
          blur: this.blur,
          focus: this.focus
        }
      }),
      h('input', {
        attrs: {
          placeholder: this.defaultTxt,
          readOnly: true
        },
        class: [
          this.defaultValClassName(this.value),
          this.xclass('init-text'),
          { [this.xclass('opacity')]: !this.initTxtDisplay }
        ]
      })
    )

    this.text.forEach((txt, index) => {
      liELe.push(h('li',
        {
          attrs: {
            'data-value': this.value[index],
            'data-index': index
          }
        }, [
          h('span', txt),
          h('span',
            {
              on: {
                click: this.clickMultiSelected
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
              this.xclass('multiple-selected-ul')
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
      h('input', {
        class: [this.xclass('init-text-input')],
        on: {
          focus: this.focus,
          blur: this.blur
        }
      }),
      h('input', {
        class: [
          this.defaultValClassName(this.value),
          this.xclass('init-text')
        ],
        attrs: {
          placeholder: '请选择',
          readOnly: true,
          value: this.text
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
          },
          input: this._searchKeyup
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

    // 当下拉菜单是以子标签加载的时候
    if (this.initOpt.length === 0 && !this.classify) {
      menuChildren.push(
        h('scroller',
          {
            props: {
              height: 200
            }
          },
          [
            h('div', {
              class: this.xclass('tag-opt')
            }, [this.$slots.default])
          ]
        )
      )
    } else {
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
        h('menu-opt',
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
            ref: 'menuOption',
            scopedSlots
          }
        ),
        h('div', {
          class: [this.xclass('option-slot'), `${this.compPrefix}-hide`]
        }, this.$slots.default)
      )
    }
  }

  menuMenuEle = [
    h('div',
      {
        class: [this.xclass('panel')],
        style: [this.menuMenuPoiStyle, this.menuMenuStyle],
        ref: 'menuMenu'
      },
      [menuChildren]
    )
  ]

  return h('div',
    {
      class: this.menuClass,
      directives: [{
        name: 'clickParent',
        expression: this.clickParent
      }],
      on: {
        keydown: this.keydown
      }
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
          click: this.click
        }
      }, [selectedBoxChildren]),

      h('transition',
        {
          on: {
            beforeEnter: this.transitionBeforeEnter,
            enter: this.transitionEnter,
            afterEnter: this.transitionAfterEnter,
            beforeLeave(el) {
              el.style.height = el.scrollHeight + 'px'
            },

            leave(el) {
              if (el.scrollHeight !== 0) {
                el.style.height = 0
              }
            },

            afterLeave(el) {
              el.style.height = ''
            }
          }
        },
        menuMenuEle
      )
    ]
  )
}