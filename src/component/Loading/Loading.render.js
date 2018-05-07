/**
 * loading.render.js
 */

export default function (h) {
  let loadingChildren = []

  if (this.isRotate) {
    let rotateChildren = []

    rotateChildren.push(h('icon', {
      class: [this.xclass('icon')],
      props: {
        size: this.size,
        kind: 'spinner',
        ui: this.ui,
        theme: this.theme
      }
    }))

    if (this.text) {
      rotateChildren.push(h('span', {
        class: [`${this.compPrefix}-m-l-half`]
      }, this.text))
    }

    loadingChildren.push(
      h(
        'div', {
          class: [this.xclass('rotate')]
        }, rotateChildren
      )
    )
  } else if (this.isSpot) {
    let spotChildren = []

    spotChildren.push(h('span', {
      class: [this.xclass('spot')]
    }, this.text))

    for (let i = 1; i <= 3; i++) {
      spotChildren.push(h('span', {
        class: [this.xclass(`spot-${i}`)]
      }, '.'))
    }

    loadingChildren.push(
      h(
        'div', {
          class: [this.xclass('spot')]
        }, spotChildren
      )
    )
  }

  if (this.bgDisplay) {
    loadingChildren.push(h('div', {
      class: [this.xclass('bg')]
    }))
  }

  return h(
    'div', {
      class: [
        this.cPrefix,
        `${this.cPrefix}-${this.themeClass}`,
        {
          [`${this.cPrefix}-mark`]: this.bgDisplay
        }
      ],
      directives: [{
        name: 'show',
        value: this.stateDisplay
      }]
    }, [
      h('div', {
        class: [this.xclass('wrap')]
      }, loadingChildren)
    ]
  )
}
