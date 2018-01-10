/**
 * pop.render.js
 */

import headerChildrenRender from './Modal.header.render'
import footerChildrenRender from './Modal.footer.render'

export default function (h) {
  let modalChildren = []
  let headerChildren = headerChildrenRender.call(this, h)
  let footerChildren = footerChildrenRender.call(this, h)

  if (this.modalHeaderDisplay) {
    modalChildren.push(
      h('header', {
        on: {
          mousedown: this.mouseDown,
          mouseup: this.mouseUp
        }
      }, [
        h('row', {
          props: {
            justify: 'justify',
            ui: this.ui,
            theme: this.theme
          }
        }, headerChildren)
      ])
    )
  }

  modalChildren.push(
    h('article', [
      h('scroller', {
        class: [this.xclass('scroller')],
        props: {
          height: this.modalHeight,
          autoHide: true,
          ui: this.ui,
          theme: this.theme
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
    ])
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

  return h('div', {
    class: [
      this.cPrefix,
      this.xclass([this.themeClass]),
      this.xclass(`type-${this.type}`),
      {
        [this.xclass('no-header')]: !this.modalHeaderDisplay
      },
      {
        [this.xclass('has-scroller')]: this.hasScroller
      }
    ],
    directives: [{
      name: 'show',
      value: this.modalDisplay
    }],
    on: {
      mousemove: this.mouseMove
    }
  }, [
    h('motion-fade', {
      props: {
        speed: 'fast',
        ui: this.ui,
        theme: this.theme
      },
      ref: 'fadeTransition'
    }, [
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
    ]),

    h('pop', {
      class: [this.xclass('pop')],
      props: {
        ui: this.ui,
        theme: this.theme
      },
      ref: 'pop'
    }, [modalChildren])
  ])
}
