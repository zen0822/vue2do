/**
 * code.render.js
 */

export default function (h) {
  let $slots = this.$slots || {}
  let codeStr = $slots.default ? $slots.default[0].text : this.code
  let lineNumEle = []

  let matches = codeStr ? codeStr.match(/\n/g) : []
  this.lineNum = matches ? matches.length + 1 : 1
  for (let i = 1, len = this.lineNum; i <= len; i++) {
    lineNumEle.push(h('li', i))
  }

  return h('div', {
    class: [this.cPrefix, this.xclass(this.themeClass)]
  }, [
    h('scroller', {
      props: {
        height: 200
      }
    }, [
      h('div', {
        class: [this.xclass('stage')]
      }, [
        h('header', {
          class: [
            this.xclass('header')
          ]
        }, this.type),
        h('article', {
          class: [
            this.xclass('article')
          ]
        }, [
          h('scroller', {
            props: {
              height: 'auto'
            }
          }, [
            h('pre', {
              class: [this.xclass('pre')]
            }, $slots.default || this.code),
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
        ]),
        h('footer', {
          class: [
            this.xclass('footer')
          ]
        }, $slots.footer || this.footer)
      ])
    ])
  ])
}
