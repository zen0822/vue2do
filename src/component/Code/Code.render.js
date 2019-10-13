/**
 * code.render.js
 */

export default function (h) {
  const $slots = this.$slots || {}
  const codeStr = $slots.default ? $slots.default[0].text : this.code
  const lineNumEle = []

  const matches = codeStr ? codeStr.match(/\n/g) : []
  this.lineNum = matches ? matches.length + 1 : 1
  for (let i = 1, len = this.lineNum; i <= len; i++) {
    lineNumEle.push(h('li', i))
  }

  return h('div', {
    class: [
      this.cPrefix,
      this.xclass(this.themeClass)
    ]
  }, [
    h('header', {
      class: [
        this.xclass('header')
      ]
    }, this.type),
    h('article', {
      class: [
        this.xclass('article')
      ],
      ref: 'article'
    }, [
      h('pre', {
        class: [this.xclass('pre')],
        style: {
          width: this.preWidth + 'px'
        }
      }, [
        h('scroller', {
          props: {
            height: 200,
            width: '100%'
          },
          ref: 'scroller'
        }, [
          h('div', {
            class: [this.xclass('content')]
          }, [
            $slots.default || this.code,
            h('aside', {
              class: [
                this.xclass('line-num')
              ]
            }, [
              h('ul', {
                class: [this.prefix('css-ul')]
              }, lineNumEle)
            ])
          ])
        ])
      ])
    ]),
    h('footer', {
      class: [
        this.xclass('footer')
      ]
    }, $slots.footer || this.footer)
  ])
}
