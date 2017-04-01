/**
 * panel.render.js
 */

export default function (h) {
  let menuStage = []
  let stageChildren = [
    h('div', [
      h('div',
        {
          class: [this.xclass('close-panel')],
          on: {
            click: () => {
              this.hide()
            }
          }
        }, [
          h('icon', {
            props: {
              kind: 'close'
            }
          })
        ]
      ),
      this.$slots.head,
      foldContent.call(this, h, this.initOpt),
      this.$slots.tail
    ])
  ]

  if (this.animate === 'vertical') {
    menuStage.push(
      h('fold-transition',
        [
          h('div',
            {
              class: [
                this.xclass('stage'),
                this.xclass(`animate-${this.animate}`)
              ],
              directives: [{
                name: 'show',
                value: this.isStageActive
              }]
            },
            stageChildren
          )
        ]
      )
    )
  } else {
    menuStage.push(
      h('transition',
        {
          props: {
            name: 'bounce'
          }
        },
        [
          h('div',
            {
              class: [
                this.xclass('stage'),
                this.xclass(`animate-${this.animate}`),
                { [this.xclass('active')]: this.isStageActive }
              ]
            },
            stageChildren
          )
        ]
      )
    )
  }

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
