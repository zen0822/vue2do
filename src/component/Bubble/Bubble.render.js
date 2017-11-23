/**
 * bubble.render.js
 */

export default function (h) {
  return h('zoom-transition', {
    props: {
      speed: 'fast',
      origin: '50% 0'
    },
    ref: 'transition'
  }, [
    h('div', {
      class: [
        this.cPrefix,
        this.xclass(this.themeClass),
        {
          [this.xclass('custom')]: !this.message
        }
      ],
      directives: [{
        name: 'show',
        value: this.bubbleDisplay
      }],
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
            kind: 'triangle-up'
          }
        }),
        h('icon', {
          class: [this.xclass('body')],
          props: {
            kind: 'triangle-up'
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
            }, this.message)
          }
        })()
      ])
    ])
  ])
}
