/**
 * input.render.js
 */

export default function (h) {
  let editBoxEle = {}

  if (this.isText) {
    editBoxEle = h('input', {
      attrs: {
        value: this.value,
        maxlength: this.number ? undefined : this.max,
        readonly: this.readOnly,
        placeholder: this.placeholder
      },
      directives: [{
        name: 'focus',
        value: this.focusing
      }],
      on: {
        focus: this.focus,
        blur: this.blur,
        keyup: this.keyup,
        input: (event) => {
          this.value = event.target.value
        }
      }
    })
  } else {
    editBoxEle = h('textarea', {
      attrs: {
        placeholder: this.placeholder,
        maxlength: this.maxLength,
        readonly: this.readOnly,
        rows: this.row
      },
      directives: [{
        name: 'focus',
        value: this.focusing
      }],
      on: {
        focus: this.focus,
        blur: this.blur,
        keyup: this.keyup,
        input: (event) => {
          this.value = event.target.value
        }
      }
    }, this.value)
  }

  return h('div',
    {
      class: this.stageClass.concat(
        this.cPrefix,
        this.xclass(`type-${this.type}`),
        this.xclass([this.themeClass, this.uiClass])
      ),
      directives: [{
        name: 'show',
        value: !this.hidden
      }]
    },
    [
      h('div',
        { class: this.wrapClass },
        [
          h('div',
            {
              class: [this.xclass('wrap-border')]
            },
            [
              h('row',
                {
                  props: {
                    justify: 'justify'
                  }
                },
                [
                  h('column',
                    {
                      props: {
                        span: this.$slots.header ? this.headerSpan : 0
                      }
                    },
                    [
                      h('div', {
                        class: this.xclass('edit-box-header')
                      }, this.$slots.header)
                    ]
                  ),
                  h('column',
                    {
                      props: {
                        span: this.inputBoxCol
                      }
                    },
                    [
                      h('div',
                        {
                          class: this.xclass('edit-box')
                        },
                        [
                          editBoxEle
                        ]
                      )
                    ]
                  ),
                  h('column',
                    {
                      props: {
                        span: this.$slots.footer ? this.footerSpan : 0
                      }
                    },
                    [
                      h('div', {
                        class: this.xclass('edit-box-footer')
                      }, this.$slots.footer)
                    ]
                  )
                ]
              )
            ]
          ),
        ]
      ),

      h('div',
        {
          class: [this.xclass('completion')],
          directives: [{
            name: 'show',
            value: this.completion
          }]
        }, this.$slots.completion
      ),

      h('transition',
        {
          props: {
            name: 'fade'
          }
        },
        [
          h('div', {
            class: [this.xclass('danger-tip')],
            directives: [{
              name: 'show',
              value: this.dangerTipDisplay
            }]
          }, this.dangerTip)
        ]
      ),

      (() => {
        if (this.maxLength && this.textLengthTip) {
          return h('div', {
            class: [this.xclass('limit-txt')]
          }, [h('span', this.limitLen), h('span', this.maxLength)])
        }
      })()
    ]
  )
}
