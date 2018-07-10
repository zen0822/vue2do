/**
 * btn.render.js
 */

export default function (h) {
  let btnEleChildren = []

  if (this.banState) {
    btnEleChildren.push(h('div', {
      class: [this.xclass('read-only-shadow')]
    }))
  }

  if (this.btnValueDisplay) {
    btnEleChildren.push(
      h('div', {
        class: [this.xclass('value-show')]
      }, [this.$slots.default])
    )
  } else if (this.type === 'flat') {
    const ele = this.$slots.default ? this.$slots.default : this.value

    btnEleChildren.push(this.link ?
      h('a', {
        attrs: {
          href: this.link
        },
        class: [this.xclass('ele-border')]
      }, [ele]) :
      h('div', {
        class: [this.xclass('ele-border')]
      }, [ele])
    )
  } else {
    let buttonChildren = []

    if (this.createdLoading) {
      buttonChildren.push(h('loading', {
        class: [this.xclass('loading')],
        props: {
          bgDisplay: false,
          ui: this.ui,
          theme: this.theme
        },
        ref: 'loading'
      }))
    }

    buttonChildren.push(this.$slots.default ? this.$slots.default : this.value)

    btnEleChildren.push(
      h(
        `${this.link ? 'a' : 'div'}`, {
          class: [
            this.xclass('ele-border')
          ]
        }, [
          buttonChildren
        ]
      )
    )
  }

  if (this.UIMaterial) {
    btnEleChildren.push(
      h('motion-rip', {
        class: [this.xclass('rip')],
        props: {
          assign: !this.isFloatBtn,
          mousePoi: this.mousePoi,
          speed: 300,
          radius: 'L'
        },
        ref: 'transition'
      }),
      h('div', {
        class: [this.prefix('css-motion-rip')],
        directives: [{
          name: 'show',
          value: this.motion
        }]
      })
    )
  }

  return h(
    'div', {
      class: [
        this.cPrefix,
        this.btnClass,
        {
          [this.xclass('ban')]: this.banState
        },
        {
          [this.xclass('block')]: this.block
        },
        {
          [this.xclass('rip')]: this.motion
        }
      ],
      on: {
        mousedown: this.mousedown,
        mouseup: this.mouseup,
        keyup: this.keyup,
        focus: this.focus,
        blur: this.blur
      },
      attrs: {
        tabindex: 0
      }
    }, [
      h('div', {
        class: [this.xclass('ele')]
      }, btnEleChildren)
    ]
  )
}
