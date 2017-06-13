/**
 * btn.render.js
 */

export default function (h) {
  let btnChildren = []

  if (this.banState) {
    btnChildren.push(h('div', {
      class: [this.xclass('read-only-shadow')]
    }))
  }

  if (this.btnValueDisplay) {
    btnChildren.push(h('div', {
      class: [this.xclass('value-show')]
    }, this.$slots.default))
  } else if (this.type === 'flat') {
    btnChildren.push(
      h(
        `${this.link ? 'a' : 'div'}`,
        {
          class: [
            this.xclass('ele'),
          ],
          on: {
            click: this.click,
            mousedown: this.mousedown,
            mouseup: this.mouseup
          },
          attrs: {
            href: this.link,
            tabindex: 0
          }
        }, this.$slots.default ? this.$slots.default : this.value
      )
    )
  } else {
    let buttonChildren = []

    if (this.createdLoading) {
      buttonChildren.push(h('loading', {
        class: [this.xclass('loading')],
        props: {
          'bg-display': false
        },
        ref: 'loading'
      }))
    }

    buttonChildren.push(this.$slots.default ? this.$slots.default : this.value)

    btnChildren.push(
      h(
        `${this.link ? 'a' : 'div'}`,
        {
          class: [
            this.xclass('ele'),
          ],
          on: {
            focus: this.focus,
            blur: this.blur
          },
          attrs: {
            href: this.link,
            tabindex: 0
          }
        }, buttonChildren
      )
    )
  }

  return h(
    'div',
    {
      class: [
        this.cPrefix,
        this.btnClass,
        { [this.xclass('rip')]: this.motion }
      ],
      on: {
        click: this.click,
        mousedown: this.mousedown,
        mouseup: this.mouseup
      }
    },
    [
      btnChildren,
      h('rip-transition',
        [
          h('div',
            {
              class: [this.xclass('rip')],
              directives: [{
                name: 'show',
                value: this.motion
              }]
            }
          )
        ]
      ),
      h('div',
        {
          class: [this.xclass('rip')],
          directives: [{
            name: 'show',
            value: this.motion
          }]
        }
      )
    ]
  )
}
