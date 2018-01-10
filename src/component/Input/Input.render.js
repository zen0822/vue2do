/**
 * input.render.js
 */

export default function (h) {
  let editBoxChild = []

  if (this.UIMaterial) {
    editBoxChild.push(
      h('div', {
        class: [
          this.xclass('edit-box-label'),
          {
            [this.xclass('edit-box-label-float')]: this.labelFloatDisplay
          }
        ],
        directives: [{
          name: 'show',
          value: !!this.label
        }],
        on: {
          click: () => {
            this.$refs.input.focus()
          }
        }
      }, this.label)
    )
  }

  editBoxChild.push(
    h('div', {
      class: [this.xclass('edit-box-placeholder')],
      directives: [{
        name: 'show',
        value: this.placeholderDisplay
      }]
    }, this.placeholder)
  )

  if (this.multiline) {
    editBoxChild.push(
      h('div', {
        attrs: {
          contenteditable: 'true'
        },
        class: [this.xclass('edit-box-multiline'), this.xclass('edit-box-input')],
        directives: [{
          name: 'focus',
          value: this.focusing
        }],
        domProps: {
          innerText: this.value
        },
        on: {
          focus: this._handlerFocus,
          blur: this._handlerBlur,
          keyup: this._handlerKeyup,
          input: this._handlerInput
        },
        ref: 'input',
        style: {
          height: this.isTextarea ? `${this.row * 24}px` : ''
        }
      })
    )
  } else {
    editBoxChild.push(
      h(`${this.isText ? 'input' : 'textarea'}`, {
        attrs: {
          readonly: this.readOnly,
          rows: this.row
        },
        class: [this.xclass('edit-box-input')],
        domProps: {
          value: this.value
        },
        directives: [{
          name: 'focus',
          value: this.focusing
        }],
        on: {
          focus: this._handlerFocus,
          blur: this._handlerBlur,
          keyup: this._handlerKeyup,
          input: this._handlerInput
        },
        ref: 'input'
      })
    )
  }

  return h('div', {
    class: this.stageClass.concat(
      this.cPrefix,
      this.xclass(`type-${this.type}`),
      this.xclass([this.themeClass, this.uiClass])
    ),
    directives: [{
      name: 'show',
      value: !this.hidden
    }]
  }, [
    h('div', {
      class: this.wrapClass
    }, [
      h('div', {
        class: [this.xclass('wrap-border')]
      }, [
        h('row', {
          props: {
            justify: 'justify'
          }
        }, [
          h('column', {
            props: {
              span: this.$slots.header ? this.headerSpan : 0
            }
          }, [
            h('div', {
              class: this.xclass('edit-box-header')
            }, this.$slots.header)
          ]),
          h('column', {
            props: {
              span: this.inputBoxCol
            }
          }, [
            h('div', {
              class: this.xclass('edit-box')
            }, editBoxChild)
          ]),
          h('column', {
            props: {
              span: this.$slots.footer ? this.footerSpan : 0
            }
          }, [
            h('div', {
              class: this.xclass('edit-box-footer')
            }, this.$slots.footer)
          ])
        ])
      ])
    ]),

    h('div', {
      class: [this.xclass('completion')],
      directives: [{
        name: 'show',
        value: this.completion
      }]
    }, this.$slots.completion),

    h('transition', {
      props: {
        name: 'fade'
      }
    }, [
      h('div', {
        class: [this.xclass('tip-danger')],
        directives: [{
          name: 'show',
          value: this.dangerTipDisplay
        }]
      }, this.dangerTip)
    ]),

    (() => {
      if (!this.number && this.max && this.textLengthTip) {
        return h('div', {
          class: [this.xclass('limit-txt')]
        }, [
            h('span', this.inputTextLength), ' / ', h('span', this.max)])
      }
    })()
  ])
}
