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
            [this.xclass('edit-box-label-float')]: this.labelDisplay && this.labelFloatDisplay
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
      class: [
        this.xclass('edit-box-placeholder')
      ],
      directives: [{
        name: 'show',
        value: this.placeholderDisplay
      }]
    }, this.placeholder)
  )

  editBoxChild.push(
    h(`${this.isTextarea || this.multiline ? 'textarea' : 'input'}`, {
      attrs: {
        readonly: this.readOnly,
        rows: this.isText ? 1 : this.row
      },
      class: [
        this.xclass('edit-box-input')
      ],
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

  if (this.multiline) {
    editBoxChild.push(h('pre', {
      class: this.xclass('edit-box-pre')
    }, [h('span', {
      ref: 'pre'
    }, this.value), h('br')]))
  }

  return h('div', {
    class: this.stageClass,
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
            justify: 'justify',
            ui: this.ui,
            theme: this.theme
          }
        }, [
          h('column', {
            props: {
              span: this.$slots.header ? this.headerSpan : 0,
              ui: this.ui,
              theme: this.theme
            }
          }, [
            h('div', {
              class: this.xclass('edit-box-header')
            }, this.$slots.header)
          ]),
          h('column', {
            props: {
              span: this.inputBoxCol,
              ui: this.ui,
              theme: this.theme
            }
          }, [
            h('div', {
              class: [
                this.xclass('edit-box'),
                {
                  [this.xclass('edit-box-multiline')]: this.multiline
                }
              ]
            }, editBoxChild)
          ]),
          h('column', {
            props: {
              span: this.$slots.footer ? this.footerSpan : 0,
              ui: this.ui,
              theme: this.theme
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
          h('span', this.inputTextLength), ' / ', h('span', this.max)
        ])
      }
    })()
  ])
}
