/**
 * menu.render.js
 */
export default function (h) {
  let selectedBoxChildren = []
  let menuChildren = []

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
          readonly: true,
          tabindex: -1
        },
        class: [
          this.defaultValClassName(this.value),
          this.xclass('init-text'),
          {
            [this.xclass('opacity')]: !this.initTxtDisplay
          }
        ]
      })
    )

    this.text.forEach((txt, index) => {
      liELe.push(h('li', [
        h('span', txt),
        h('span', {
          on: {
            click: (event) => this.clickMultiSelected(event, index + 1)
          }
        }, [
          h('icon', {
            props: {
              kind: 'close',
              ui: this.ui,
              theme: this.theme
            }
          })
        ])
      ]))
    })

    selectedBoxChildren.push(
      h('scroller', {
        class: [this.xclass('scroller')],
        props: {
          height: 100,
          width: '100%',
          ui: this.ui,
          theme: this.theme
        },
        directives: [{
          name: 'show',
          value: !this.initTxtDisplay
        }],
        ref: 'scroller'
      }, [
        h('ul', {
          class: [
            `${this.compPrefix}-ul`,
            this.xclass('multiple-selected-ul')
          ]
        }, [liELe])
      ])
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
          tabindex: -1,
          readOnly: true,
          value: this.text
        }
      })
    )
  }

  selectedBoxChildren.push(h('icon', {
    class: [this.xclass('caret-down-icon')],
    props: {
      kind: 'arrow-south',
      ui: this.ui,
      theme: this.theme
    }
  }))

  if (this.search) {
    menuChildren.push(h('div', {
      class: [
        this.xclass('search-input')
      ],
      on: {
        click(event) {
          event.stopPropagation()
        },
        input: this._searchKeyup
      }
    }, [
      h('input-box', {
        props: {
          placeholder: '请输入搜索值',
          ui: this.ui,
          theme: this.theme
        }
      }, [
        h('icon', {
          props: {
            kind: 'search',
            ui: this.ui,
            theme: this.theme
          },
          slot: 'header'
        })
      ])
    ]))
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
      h('select-opt', {
        class: [this.xclass('opt-comp')],
        props: {
          multiple: this.multiple,
          valName: this.valName,
          txtName: this.txtName,
          option: this.searchOptionDisplay ? this.searchOptionItem : this.option,
          optRoot: this.me,
          ui: this.ui,
          theme: this.theme
        },
        ref: 'option',
        scopedSlots
      }),
      h('div', {
        class: [this.xclass('option-slot')],
        style: {
          display: 'none'
        }
      }, this.$slots.default)
    )
  }

  return h('div', {
    class: this.selectClass,
    directives: [{
      name: 'clickParent',
      expression: this.clickParent
    }],
    on: {
      keydown: this.keydown,
      selectstart: (event) => event.preventDefault()
    }
  }, [
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
      },
      ref: 'selected'
    }, [selectedBoxChildren]),

    h('menu-comp', {
      class: [this.xclass('menu')],
      props: {
        noTrig: true,
        noCoverTrig: true,
        width: this.menuWidth,
        trigHeight: this.selectedHeight,
        ui: this.ui,
        theme: this.theme
      },
      ref: 'menu'
    }, [h('div', {
      class: [this.xclass('panel')]
    }, [menuChildren])])
  ])
}
