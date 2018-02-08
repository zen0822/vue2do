/**
 * menu.render.js
 */
export default function (h) {
  let children = []
  const panelChildren = [
    h('scroller', {
      props: {
        height: this.height,
        width: '100%',
        ui: this.ui,
        theme: this.theme
      },
      ref: 'scroller'
    }, [
      h('div', {
        class: this.xclass('container')
      }, [this.$slots.default])
    ])
  ]

  children.push(
    h('div', {
      class: [this.xclass('ban')],
      directives: [{
        name: 'show',
        value: this.ban
      }]
    })
  )

  if (!this.noTrig) {
    const $slotTrigger = this.$slots.trigger
    const triggerBox = $slotTrigger ? this.$slots.trigger : [
      h('btn', {
        props: {
          type: 'float',
          ui: this.ui,
          theme: this.theme
        },
        ref: 'triggerBtn'
      }, [h('icon', {
        props: {
          kind: 'sort',
          size: 'S',
          ui: this.ui,
          theme: this.theme
        }
      })])
    ]

    children.push(
      h('div', {
        class: [this.xclass('trigger')],
        ref: 'trigger',
        on: {
          click: this.click
        }
      }, [triggerBox])
    )
  }

  if (this.UIMaterial) {
    children.push(
      h('motion', {
        props: {
          height: this.menuHeight,
          slideLength: this.coverTrig ? 0 : this.triggerHeight,
          display: false,
          ui: this.ui
        },
        ref: 'motion'
      }, [
        h('div', {
          class: [this.xclass('panel')],
          on: {
            click: (event) => event.stopPropagation()
          },
          style: {
            width: this.width !== 'auto' ? `${this.width}px` : 'auto'
          },
          ref: 'panel'
        }, panelChildren)
      ])
    )
  } else {
    children.push(
      h('div', {
        class: [this.xclass('panel')],
        on: {
          click: (event) => event.stopPropagation()
        },
        style: {
          width: this.width !== 'auto' ? `${this.width}px` : 'auto',
          top: this.trigHeight ? `${this.trigHeight}px` : '',
          display: this.panelDisplay ? '' : 'none',
          visibility: this.panelDisplay ? '' : 'hidden'
        },
        ref: 'panel'
      }, panelChildren)
    )
  }

  return h('div', {
    class: this.menuClass,
    directives: [{
      name: 'clickParent',
      expression: this.clickParent
    }],
    on: {
      keydown: this.keydown,
      selectstart: (event) => event.preventDefault()
    }
  }, children)
}
