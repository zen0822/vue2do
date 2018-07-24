/**
 * check.render.js
 */

const bootstrapCheck = function (h, {
  className = '',
  checked = false,
  indeterminate = false,
  multiple = false
} = {}) {
  return h('div', {
    class: [this.xclass('icon')]
  }, [
    h('icon', {
      props: {
        kind: this._getIconName(checked, indeterminate),
        ui: this.ui,
        theme: this.theme
      }
    })
  ])
}

const materialCheck = function (h, {
  className = '',
  multiple = false,
  ripRefName = ''
} = {}) {
  let iconBoxEle = [
    h('div', {
      class: [this.xclass('icon-box-rail')]
    })
  ]

  if (multiple) {
    iconBoxEle.push(
      h('div', {
        class: [this.xclass('icon-box-checked')]
      }, [
        h('icon', {
          props: {
            kind: 'checked'
          }
        })
      ]),
      h('div', {
        class: [this.xclass('icon-box-indeterminate')]
      })
    )
  } else {
    iconBoxEle.push(
      h('div', {
        class: [this.xclass('icon-box-dot')]
      })
    )
  }

  return h('div', {
    class: [this.xclass(['icon', `icon-${multiple ? 'checkbox' : 'radio'}`])]
  }, [
    h('div', {
      class: [this.xclass(['icon-box'])]
    }, iconBoxEle),
    h('div', {
      class: [this.xclass('motion-rip')]
    }),
    h('motion-rip', {
      class: [this.xclass('rip')],
      props: {
        circle: true,
        speed: 180,
        radius: 'M'
      },
      ref: ripRefName
    })
  ])
}

const checkAllEle = function (h) {
  return h('div', {
    attrs: {
      tabindex: this.checkAllDisabled ? undefined : 0
    },
    class: [
      this.xclass('opt-check-all'),
      {
        [this.xclass('checked')]: this.checkedAll
      },
      {
        [this.xclass('indeterminate')]: this.checkedSome
      },
      {
        [this.xclass('focused')]: !this.checkAllDisabled && this.focusedCheckAll
      },
      {
        [this.xclass('disabled')]: this.checkAllDisabled
      }
    ],
    on: this.checkAllDisabled ? {} : {
      click: this.checkAllOption,
      mousedown: (event) => this._handlerMousedownCheckAll(event),
      mouseup: (event) => this._handlerMouseupCheckAll(event),
      focus: (event) => this._handlerFocusCheckAll(event),
      blur: (event) => this._handlerBlurCheckAll(event)
    }
  }, [
    this.UIBootstrap ? bootstrapCheck.call(this, h, {
      checked: this.checkedAll,
      ripRefName: 'motionCheckAll',
      indeterminate: this.checkedSome,
      className: [this.xclass('icon')],
      motionRipFocused: false
    }) : materialCheck.call(this, h, {
      multiple: true,
      className: [this.xclass('icon')],
      ripRefName: 'motionCheckAll'
    }),
    (() => {
      if (this.checkAllLabel) {
        return h('span', {
          class: [this.xclass('lable')]
        }, this.checkAllLabel)
      }
    })(),
    (() => {
      if (this.checkAllDisabled) {
        return h('div', {
          class: [this.xclass('overlay')]
        })
      }
    })()
  ])
}

export default function (h) {
  let RowChildren = []

  if (!Array.isArray(this.stateOption) || this.stateOption.length === 0) {
    return false
  }

  let checkEle = []

  this.stateOption.forEach((item, index) => {
    const addBoxStyle = this.stateOption.length > 1
    const currentIndex = index + 1
    let iconTypeEle = null

    if (this.UIBootstrap) {
      iconTypeEle = bootstrapCheck.call(this, h, {
        checked: this.isRadio ? this.index === index : this.index.includes(index),
        ripRefName: `motionCheck${currentIndex}`,
        motionRipFocused: this.optionFocus[index]
      })
    } else {
      iconTypeEle = materialCheck.call(this, h, {
        multiple: this.isCheckbox,
        ripRefName: `motionCheck${currentIndex}`
      })
    }

    checkEle.push(
      h('column', {
        class: [this.xclass('opt-col')],
        props: {
          span: this.vertical ? 12 : undefined
        }
      }, [
        h('div', {
          attrs: {
            tabindex: item.disabled ? undefined : 0
          },
          class: [
            this.xclass('box'),
            {
              [this.xclass('box-style')]: addBoxStyle
            },
            {
              [this.xclass('checked')]: this.isCheckbox ?
                this.index.includes(index) : index === this.index
            },
            {
              [this.xclass('focused')]: !item.disabled && this.optionFocus[index]
            },
            {
              [this.xclass('disabled')]: item.disabled
            }
          ],
          on: item.disabled ? {} : {
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
            if (item[this.textName]) {
              return h('span', {
                class: [this.xclass('lable')]
              }, item[this.textName])
            }
          })(),
          (() => {
            if (item.disabled) {
              return h('div', {
                class: [this.xclass('overlay')]
              })
            }
          })()
        ])
      ])
    )
  })

  RowChildren.push(checkEle)

  return h('div', {
    class: [
      this.cPrefix,
      this.xclass(['stage', this.themeClass, this.uiClass]),
      {
        [this.xclass('multiple')]: this.multiple
      },
      {
        [this.xclass('vertical')]: this.vertical
      }
    ]
  }, [
    (() => {
      if (this.checkAll && this.multiple) {
        return checkAllEle.call(this, h)
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
