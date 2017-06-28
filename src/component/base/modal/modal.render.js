/**
 * pop.render.js
 */

import headerChildrenRender from './modal.header.render'
import footerChildrenRender from './modal.footer.render'

export default function (h) {
  let modalChildren = []
  let headerChildren = headerChildrenRender.call(this, h)
  let footerChildren = footerChildrenRender.call(this, h)

  if (this.modalHeaderDisplay) {
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
            height: this.modalHeight,
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

  if (this.modalFooterDisplay) {
    modalChildren.push(
      h('footer', {
        class: this.footerClass,
        directives: [{
          name: 'show',
          value: this.isBiggerFull
        }]
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
            { [this.xclass('no-header')]: !this.modalHeaderDisplay },
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
