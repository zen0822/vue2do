/**
 * pop.render.js
 */

import headerChildrenRender from './modal.header.render'

export default function (h) {
  let modalChildren = []
  let headerChildren = headerChildrenRender.call(this, h)

  if (this.headerDisplay && (this.isFull || !this.isFull && this.modalHeader)) {
    modalChildren.push(
      h('header',
        {
          on: {
            mousedown: this.mouseDown,
            mouseup: this.mouseUp
          }
        },
        [
          h('row', {
            props: { justify: 'justify' }
          }, headerChildren)
        ]
      )
    )
  }

  modalChildren.push(
    h('article',
      [
        h('scroller', {
          class: [this.xclass('scroller')],
          props: {
            height: this.isFull ? (this.isBiggerFull ? 300 : '100%') : 120,
            autoHide: true
          },
          ref: 'scroller'
        }, (() => {
          if (this.$slots.default) {
            return this.$slots.default
          } else {
            return [
              h('div', {
                class: this.xclass('alert-message')
              }, this.modalMessage)
            ]
          }
        })())
      ]
    )
  )

  if (this.footerDisplay || (this.footerDisplay && this.isFull && this.isBiggerFull)) {
    let footerChildren = []

    if (this.noBtn) {
      footerChildren.push(h('btn', {
        props: {
          value: this.noBtn,
          type: 'flat'
        },
        on: {
          click: this.no
        }
      }))
    }

    if (this.okBtn) {
      footerChildren.push(
        h('btn', {
          props: {
            value: this.okBtn,
            type: 'flat'
          },
          on: {
            click: this.ok
          }
        })
      )
    }

    modalChildren.push(
      h('footer', {
        class: this.footerClass
      }, footerChildren)
    )
  }

  return h('no-transition',
    {
      props: {
        speed: 'fast'
      }
    },
    [
      h('div',
        {
          class: [
            this.cPrefix,
            this.xclass([this.themeClass]),
            this.xclass(`type-${this.type}`),
            { [this.xclass('has-scroller')]: this.hasScroller }
          ],
          directives: [{
            name: 'show',
            value: this.modalDisplay
          }],
          on: {
            mousemove: this.mouseMove
          }
        },
        [
          h('fade-transition',
            {
              props: {
                speed: 'fast'
              }
            },
            [
              h('div', {
                class: this.xclass('bg'),
                directives: [{
                  name: 'show',
                  value: this.modalDisplay
                }],
                on: {
                  click: this.no
                }
              })
            ]
          ),

          h('pop',
            {
              class: [this.xclass('pop')],
              ref: 'pop'
            },
            [modalChildren]
          )
        ]
      )
    ]
  )
}
