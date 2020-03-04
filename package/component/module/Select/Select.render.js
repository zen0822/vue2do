/**
 * menu.render.js
 */
export default function (h) {
  const selectedBoxChildren = []
  const menuChildren = []

  if (this.multiple) {
    const liELe = []

    selectedBoxChildren.push(
      h('div', {
        class: [
          this.defaultValClassName(this.stateValue),
          this.xclass('init-text'),
          {
            [this.xclass('opacity')]: !this.initTxtDisplay
          }
        ]
      }, this.defaultText)
    )

    this.text.forEach((txt, index) => {
      liELe.push(h('li', [
        h('span', txt),
        h('span', {
          class: [this.prefix('css-m-l-half')],
          on: {
            click: (event) => this.clickMultiSelected(event, index + 1)
          }
        }, [
          h('icon', {
            props: {
              kind: 'close',
              theme: 'grey',
              size: 'xs'
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
          width: '100%'
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
      h('div', {
        class: [
          this.defaultValClassName(this.stateValue),
          this.xclass('init-text')
        ]
      }, this.text)
    )
  }

  selectedBoxChildren.push(h('icon', {
    class: [this.xclass('caret-down-icon')],
    props: {
      kind: 'triangle-down',
      theme: 'dark',
      size: 'xs'
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
            theme: 'grey',
            size: 'xs'
          },
          slot: 'header'
        })
      ])
    ]))
  }

  if (Array.isArray(this.stateOption)) {
    const scopedSlots = []

    if (this.$scopedSlots && this.$scopedSlots['custom']) {
      this.stateOption.forEach((item, index) => {
        Object.assign(scopedSlots, {
          [`${index}`]: () => {
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
          menuWidth: this.stateMenuWidth,
          valueName: this.valueName,
          textName: this.textName,
          option: this.searchOptionDisplay ? this.searchOptionItem : this.stateOption,
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
    attrs: {
      tabindex: 0
    },
    class: this.selectClass,
    directives: [{
      name: 'clickParent',
      expression: this.clickParent
    }],
    on: {
      keydown: this._handlerKeydown,
      selectstart: (event) => event.preventDefault(),
      blur: this.blur,
      focus: this.focus
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
        coverTrig: this.coverTrig,
        width: this.stateMenuWidth,
        trigHeight: this.UIBootstrap ? this.selectedHeight + 4 : this.selectedHeight,
        ui: this.ui,
        theme: this.theme
      },
      ref: 'menu'
    }, [h('div', {
      class: [this.xclass('panel')]
    }, [menuChildren])])
  ])
}
