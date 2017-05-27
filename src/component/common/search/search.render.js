/**
 * complete.render.js
 */

export default function (h) {
  return h('div',
    {
      class: [this.cPrefix]
    },
    [
      (() => {
        if (this.input) {
          return h('input-box', {
            class: [this.xclass('input')]
          })
        } else {
          return null
        }
      })(),
      h('div',
        {
          class: [this.xclass('match')],
          directives: [{
            name: 'show',
            value: this.matchDisplay
          }]
        },
        [
          h('list', {
            props: {
              item: this.matchOpt,
              pageSize: 6,
              auto: true,
              pageType: 'more',
              pager: true,
              theme: 'default',
              scrollerHeight: 150
            },
            scopedSlots: {
              default: (props) => {
                return h('div',
                  {
                    class: [this.xclass('list-content')],
                    domProps: {
                      'data-index': props.index
                    },
                    on: {
                      click: this._clickMatchOpt
                    }
                  },
                  [
                    h('span', props.item.text)
                  ]
                )
              }
            }
          })
        ]
      )
    ]
  )
}
