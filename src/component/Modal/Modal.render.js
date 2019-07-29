/**
 * pop.render.js
 */

import headerChildrenRender from './Modal.header.render'
import footerChildrenRender from './Modal.footer.render'

export default function (h) {
  let modalChildren = []
  let articleEle = this.$slots.default ? this.$slots.default : [
    h('div', {
      class: this.xclass('alert-message')
    }, this.stateMessage)
  ]
  let headerChildren = headerChildrenRender.call(this, h)
  let footerChildren = footerChildrenRender.call(this, h)

  if (this.modalHeaderDisplay) {
    modalChildren.push(
      h('header', {
        class: [this.xclass('header')],
        on: {
          mousedown: this.mouseDown,
          mouseup: this.mouseUp
        }
      }, [h('row', {
        props: {
          justify: 'justify',
          ui: this.stateUI,
          theme: this.stateTheme
        }
      }, headerChildren)])
    )
  }

  if (this.UIMaterial) {
    modalChildren.push(
      h('article',
        {
          class: [this.xclass('article')]
        }, [
          h('scroller', {
            class: [this.xclass('scroller')],
            props: {
              height: this.modalHeight,
              width: '100%',
              autoHide: true,
              ui: this.stateUI,
              theme: this.stateTheme
            },
            ref: 'scroller'
          }, articleEle)
        ])
    )
  } else if (this.pure) {
    modalChildren.push(articleEle)
  } else {
    modalChildren.push(h('article', {
      class: [this.xclass('article')]
    }, articleEle))
  }

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

  return h(
    'div',
    {
      class: [
        this.cPrefix,
        this.xclass([this.uiClass]),
        this.xclass([this.themeClass]),
        this.xclass(`size-${this.size.toLowerCase()}`),
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
    },
    [
      h(
        'motion-fade',
        {
          props: {
            speed: 'fast'
          },
          ref: 'fadeTransition'
        },
        [
          h(
            'div',
            {
              class: this.xclass('bg'),
              style: {
                'background-color': this.hideLayover ? 'transparent' : ''
              },
              on: {
                click: this._handlerClickBg
              }
            }
          )
        ]
      ),

      h(
        'pop',
        {
          class: [this.xclass('pop')],
          props: {
            ui: this.stateUI,
            theme: this.stateTheme,
            type: this.motion
          },
          ref: 'pop'
        },
        [
          h(
            'div',
            {
              class: [this.xclass('content')],
              style: {
                width: this.width
              }
            },
            [modalChildren])
        ]
      )
    ]
  )
}
