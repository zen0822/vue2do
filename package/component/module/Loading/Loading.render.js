/**
 * loading.render.js
 */

export default function (h) {
  const loadingChildren = []

  if (this.isRotate) {
    let rotateEle = null

    if (this.UIBootstrap) {
      rotateEle = (
        h(
          'div', {
            class: [this.xclass('rotate')]
          }, [h('icon', {
            class: [this.xclass('icon')],
            props: {
              size: this.size,
              kind: 'spinner',
              ui: this.ui,
              theme: this.theme
            }
          })]
        )
      )
    } else {
      rotateEle = (
        h('div', {
          class: [this.xclass('rotate')]
        }, [
          h(
            'div', {
              class: [this.xclass('rotate-stage')]
            }, [
              h('div', {
                class: [this.xclass('rotate-left')]
              }, [h('div', {
                class: [this.xclass('rotate-spin')]
              })]),
              h('div', {
                class: [this.xclass('rotate-center')]
              }, [h('div', {
                class: [this.xclass('rotate-spin')]
              })]),
              h('div', {
                class: [this.xclass('rotate-right')]
              }, [h('div', {
                class: [this.xclass('rotate-spin')]
              })])
            ]
          )
        ])
      )
    }

    loadingChildren.push(rotateEle)
  } else if (this.isSpot) {
    const spotChildren = []

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
      class: this.compClass,
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
