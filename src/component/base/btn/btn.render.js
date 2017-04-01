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
  } else if (this.isLink) {
    btnChildren.push(h('a', {
      on: {
        click: this.click
      }
    }, this.$slots.default))
  } else if (this.isButton) {
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
        'button',
        {
          class: [this.xclass(['ele', this.btnClass, this.sizeClass])],
          on: {
            click: this.click
          }
        }, buttonChildren
      )
    )
  }

  return h(
    'div',
    {
      class: [this.cPrefix]
    },
    [
      h('div', {
        class: [this.xclass([this.themeClass, 'stage'])]
      }, btnChildren)
    ]
  )
}
