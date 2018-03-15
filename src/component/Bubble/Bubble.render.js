/**
 * bubble.render.js
 */

export default function (h) {
  return h('zoom-transition', {
    props: {
      speed: 'fast',
      origin: '50% 0',
      global: this.fixed,
      once: true,
      display: this.display
    },
    ref: 'transition'
  }, [
    h('div', {
      class: this.compClass,
      on: {
        click: this.click
      }
    }, [
      h('div', {
        class: [this.xclass('arrow')]
      }, [
        h('icon', {
          class: [this.xclass('border')],
          props: {
            kind: 'triangle-up',
            ui: this.ui,
            theme: this.theme
          }
        }),
        h('icon', {
          class: [this.xclass('body')],
          props: {
            kind: 'triangle-up',
            ui: this.ui,
            theme: this.theme
          }
        })
      ]),

      h('div', {
        class: [this.xclass('slot')]
      }, [
        (() => {
          if (this.$slots.default) {
            return this.$slots.default
          } else {
            return h('div', {
              class: [this.xclass('text')]
            }, this.stateMessage)
          }
        })()
      ])
    ])
  ])
}
