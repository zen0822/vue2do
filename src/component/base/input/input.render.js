/**
 * input.render.js
 */

export default function (h) {
  let editBoxEle = {}

  if (this.isText) {
    editBoxEle = h('input', {
      attrs: {
        value: this.value,
        maxlength: this.maxLength,
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
        keyup: this.keyUp,
        input: (event) => {
          this.value = event.target.value
        }
      }
    }, this.value)
  }

  return h('div',
    {
      class: [this.cPrefix]
    },
    [
      h('div',
        {
          class: this.stageClass.concat(this.xclass(['stage', this.themeClass])),
          directives: [{
            name: 'show',
            value: !this.hidden
          }]
        },
        [
          h('div',
            {
              class: this.wrapClass
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
                        span: this.$slots.head ? 1 : 0
                      }
                    },
                    [
                      h('div', {
                        class: this.xclass('edit-box-left')
                      }, this.$slots.head)
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
                        span: 1
                      }
                    },
                    [
                      h('div', {
                        class: this.xclass('edit-box-right')
                      }, this.$slots.tail)
                    ]
                  )
                ]
              ),
              h('div',
                {
                  class: [this.xclass('auto-completion')],
                  directives: [{
                    name: 'show',
                    value: this.completionDisplay
                  }]
                },
                [
                  h('ul', this.completionItems.map((item, index) => {
                    return h('li', {
                      domProps: {
                        'data-index': index
                      },
                      on: {
                        click: this._clickCompletion
                      }
                    }, item.text)
                  }))
                ]
              )
            ]
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
    ]
  )
}
