/**
 * panel.render.js
 */

export default function (h) {
  let $slots = this.$slots || {}

  return h('div',
    {
      class: [this.cPrefix, this.xclass(this.themeClass)]
    },
    [
      h('header', {
        class: [
          this.xclass('header')
        ]
      }, $slots.header || this.header),
      h('article', {
        class: [
          this.xclass('article')
        ]
      }, $slots.article || this.article),
      h('footer', {
        class: [
          this.xclass('footer')
        ]
      }, $slots.footer || this.footer),
      h('aside', {
        class: [
          this.xclass('aside')
        ]
      }, $slots.aside || this.aside)
    ]
  )
}
