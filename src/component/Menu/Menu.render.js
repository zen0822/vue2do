/**
 * menu.render.js
 */
export default function (h) {
  let children = []

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
          type: 'float'
        }
      }, [h('icon', {
        props: {
          color: '#fff',
          kind: 'sort'
        }
      })])
    ]

    children.push(
      h('div', {
        class: [this.xclass('trigger')],
        on: {
          click: this.click
        },
        ref: 'trigger'
      }, [h('input', {
          class: [this.xclass('trigger-input')],
          on: {
            focus: this.focus,
            blur: this.blur
          }
        }),
        triggerBox
      ])
    )
  }

  children.push(
    h('motion', {
      props: {
        height: this.menuHeight,
        width: this.menuWidth,
        slideLength: this.triggerHeight,
        sync: true
      },
      ref: 'motion'
    }, [
      h('div', {
        class: [this.xclass('panel')],
        directives: [{
          name: 'show',
          value: false
        }],
        style: [this.panelStyle],
        ref: 'panel'
      }, [h('scroller', {
        props: {
          height: this.height,
          width: '100%'
        },
        ref: 'scroller'
      }, [
        h('div', {
          class: this.xclass('container')
        }, [this.$slots.default])
      ])])
    ])
  )

  return h('div', {
    class: this.menuClass,
    directives: [{
      name: 'clickParent',
      expression: this.clickParent
    }],
    on: {
      keydown: this.keydown
    }
  }, children)
}
